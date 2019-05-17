import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  ensureSubject,
  unlinkSubjectCourseFromSubjectLink,
  linkSubjectCourseToSubjectLink,
  ensureCourse,
  unlinkSubjectCourseFromCourseLink,
  linkSubjectCourseToCourseLink,
} from '../../../../common';
import gql from 'graphql-tag';
import { merge } from 'lodash';

export default new Mutation({
  schema: gql`
    extend type Mutation {
      updateSubjectCourse(
        input: updateSubjectCourseInput!
      ): updateSubjectCoursePayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        description?: string;
        subject?: string;
        course?: string;
        hours?: number;
        level?: string;
        subjectLink?: object /*Subject*/;
        subjectLinkUnlink?: object /*Subject*/;
        subjectLinkCreate?: object /*Subject*/;
        courseLink?: object /*Course*/;
        courseLinkUnlink?: object /*Course*/;
        courseLinkCreate?: object /*Course*/;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('updateSubjectCourse');
      let payload = context.connectors.SubjectCourse.getPayload(args);

      let result;
      let previous;

      if (args.id) {
        previous = await context.connectors.SubjectCourse.findOneById(args.id);
        result = await context.connectors.SubjectCourse.findOneByIdAndUpdate(
          args.id,
          merge({}, previous, payload),
        );
      }

      if (!result) {
        throw new Error('item of type SubjectCourse is not found for update');
      }

      if (context.pubsub) {
        context.pubsub.publish('SubjectCourse', {
          SubjectCourse: {
            mutation: 'UPDATE',
            node: result,
            previous,
            updatedFields: Object.keys(payload).filter(
              f => payload[f] !== undefined,
            ),
            payload: args,
          },
        });
      }

      let resActions = [];
      if (args.subjectLinkUnlink) {
        let $item = args.subjectLinkUnlink;
        if ($item) {
          resActions.push(async () => {
            let subjectLink = await ensureSubject({
              args: $item,
              context,
              create: false,
            });
            if (subjectLink) {
              return unlinkSubjectCourseFromSubjectLink({
                context,
                subjectLink,
                subjectCourse: result,
              });
            } else {
              const err = `can't unlinkSubjectCourseToSubjectLink item not found`;
              logger.error(err);
              throw new Error(err);
            }
          });
        }
      }

      if (args.subjectLinkCreate) {
        let $item = args.subjectLinkCreate as { id };
        if ($item) {
          resActions.push(async () => {
            let subjectLink = await ensureSubject({
              args: $item,
              context,
              create: true,
            });

            if (subjectLink) {
              return linkSubjectCourseToSubjectLink({
                context,
                subjectLink,
                subjectCourse: result,
              });
            } else {
              const err = `can't linkSubjectCourseToSubjectLink item not found`;
              logger.error(err);
              throw new Error(err);
            }
          });
        }
      }

      if (args.subjectLink) {
        let $item = args.subjectLink as { id };
        if ($item) {
          resActions.push(async () => {
            let subjectLink = await ensureSubject({
              args: $item,
              context,
              create: false,
            });

            if (subjectLink) {
              return linkSubjectCourseToSubjectLink({
                context,
                subjectLink,
                subjectCourse: result,
              });
            } else {
              const err = `can't linkSubjectCourseToSubjectLink item not found`;
              logger.error(err);
              throw new Error(err);
            }
          });
        }
      }

      if (args.courseLinkUnlink) {
        let $item = args.courseLinkUnlink;
        if ($item) {
          resActions.push(async () => {
            let courseLink = await ensureCourse({
              args: $item,
              context,
              create: false,
            });
            if (courseLink) {
              return unlinkSubjectCourseFromCourseLink({
                context,
                courseLink,
                subjectCourse: result,
              });
            } else {
              const err = `can't unlinkSubjectCourseToCourseLink item not found`;
              logger.error(err);
              throw new Error(err);
            }
          });
        }
      }

      if (args.courseLinkCreate) {
        let $item = args.courseLinkCreate as { id };
        if ($item) {
          resActions.push(async () => {
            let courseLink = await ensureCourse({
              args: $item,
              context,
              create: true,
            });

            if (courseLink) {
              return linkSubjectCourseToCourseLink({
                context,
                courseLink,
                subjectCourse: result,
              });
            } else {
              const err = `can't linkSubjectCourseToCourseLink item not found`;
              logger.error(err);
              throw new Error(err);
            }
          });
        }
      }

      if (args.courseLink) {
        let $item = args.courseLink as { id };
        if ($item) {
          resActions.push(async () => {
            let courseLink = await ensureCourse({
              args: $item,
              context,
              create: false,
            });

            if (courseLink) {
              return linkSubjectCourseToCourseLink({
                context,
                courseLink,
                subjectCourse: result,
              });
            } else {
              const err = `can't linkSubjectCourseToCourseLink item not found`;
              logger.error(err);
              throw new Error(err);
            }
          });
        }
      }

      if (resActions.length > 0) {
        await Promise.all(resActions);
      }
      return {
        subjectCourse: result,
      };
    },
  ),
});
