import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  ensureSubject,
  linkSubjectCourseToSubjectLink,
  ensureCourse,
  linkSubjectCourseToCourseLink,
} from '../../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      createSubjectCourse(
        input: createSubjectCourseInput!
      ): createSubjectCoursePayload
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
        courseLink?: object /*Course*/;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('createSubjectCourse');
      let create = context.connectors.SubjectCourse.getPayload(args, false);

      let result = await context.connectors.SubjectCourse.create(create);

      if (context.pubsub) {
        context.pubsub.publish('SubjectCourse', {
          SubjectCourse: {
            mutation: 'CREATE',
            node: result,
            previous: null,
            updatedFields: [],
            payload: args,
          },
        });
      }

      let subjectCourseEdge = {
        cursor: result.id,
        node: result,
      };

      if (args.subjectLink) {
        let $item = args.subjectLink as { id };
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

      if (args.courseLink) {
        let $item = args.courseLink as { id };
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

      return {
        subjectCourse: subjectCourseEdge,
      };
    },
  ),
});
