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

      if (args.subjectLinkUnlink) {
        let $item = args.subjectLinkUnlink;
        if ($item) {
          let subjectLink = await ensureSubject({
            args: $item,
            context,
            create: false,
          });
          await unlinkSubjectCourseFromSubjectLink({
            context,
            subjectLink,
            subjectCourse: result,
          });
        }
      }

      if (args.subjectLinkCreate) {
        let $item = args.subjectLinkCreate as { id };
        if ($item) {
          let subjectLink = await ensureSubject({
            args: $item,
            context,
            create: true,
          });

          await linkSubjectCourseToSubjectLink({
            context,
            subjectLink,
            subjectCourse: result,
          });
        }
      }

      if (args.subjectLink) {
        let $item = args.subjectLink as { id };
        if ($item) {
          let subjectLink = await ensureSubject({
            args: $item,
            context,
            create: false,
          });

          await linkSubjectCourseToSubjectLink({
            context,
            subjectLink,
            subjectCourse: result,
          });
        }
      }

      if (args.courseLinkUnlink) {
        let $item = args.courseLinkUnlink;
        if ($item) {
          let courseLink = await ensureCourse({
            args: $item,
            context,
            create: false,
          });
          await unlinkSubjectCourseFromCourseLink({
            context,
            courseLink,
            subjectCourse: result,
          });
        }
      }

      if (args.courseLinkCreate) {
        let $item = args.courseLinkCreate as { id };
        if ($item) {
          let courseLink = await ensureCourse({
            args: $item,
            context,
            create: true,
          });

          await linkSubjectCourseToCourseLink({
            context,
            courseLink,
            subjectCourse: result,
          });
        }
      }

      if (args.courseLink) {
        let $item = args.courseLink as { id };
        if ($item) {
          let courseLink = await ensureCourse({
            args: $item,
            context,
            create: false,
          });

          await linkSubjectCourseToCourseLink({
            context,
            courseLink,
            subjectCourse: result,
          });
        }
      }

      return {
        subjectCourse: result,
      };
    },
  ),
});
