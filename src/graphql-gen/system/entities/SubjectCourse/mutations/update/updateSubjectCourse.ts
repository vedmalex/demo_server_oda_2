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
    extend type RootMutation {
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
      const needCommit = await context.connectors.ensureTransaction();
      const txn = await context.connectors.transaction;
      logger.trace('updateSubjectCourse');
      try {
        let payload = context.connectors.SubjectCourse.getPayload(args);

        let result;
        let previous;

        if (args.id) {
          previous = await context.connectors.SubjectCourse.findOneById(
            args.id,
          );
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
              return unlinkSubjectCourseFromSubjectLink({
                context,
                subjectLink,
                subjectCourse: result,
              });
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

              return linkSubjectCourseToSubjectLink({
                context,
                subjectLink,
                subjectCourse: result,
              });
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

              return linkSubjectCourseToSubjectLink({
                context,
                subjectLink,
                subjectCourse: result,
              });
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
              return unlinkSubjectCourseFromCourseLink({
                context,
                courseLink,
                subjectCourse: result,
              });
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

              return linkSubjectCourseToCourseLink({
                context,
                courseLink,
                subjectCourse: result,
              });
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

              return linkSubjectCourseToCourseLink({
                context,
                courseLink,
                subjectCourse: result,
              });
            });
          }
        }

        if (resActions.length > 0) {
          await Promise.all(resActions);
        }
        if (needCommit) {
          return txn.commit().then(() => ({
            subjectCourse: result,
          }));
        } else {
          return {
            subjectCourse: result,
          };
        }
      } catch (e) {
        await txn.abort();
        throw e;
      }
    },
  ),
});
