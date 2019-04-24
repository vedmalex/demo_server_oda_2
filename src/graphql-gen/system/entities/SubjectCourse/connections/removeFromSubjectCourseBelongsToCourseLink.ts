import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
} from '../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      removeFromSubjectCourseBelongsToCourseLink(
        input: removeFromSubjectCourseBelongsToCourseLinkInput
      ): removeFromSubjectCourseBelongsToCourseLinkPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        subjectCourse?: string;
        course?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('removeFromSubjectCourseBelongsToCourseLink');
      let subjectCourse = args.subjectCourse;
      let course = args.course;
      let payload = {
        subjectCourse,
        course,
      };
      await context.connectors.SubjectCourse.removeFromCourseLink(payload);

      let source = await context.connectors.SubjectCourse.findOneById(
        subjectCourse,
      );

      if (context.pubsub) {
        context.pubsub.publish('SubjectCourse', {
          SubjectCourse: {
            mutation: 'UNLINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                subjectCourse: args.subjectCourse,
                course: args.course,
              },
              relation: 'courseLink',
            },
          },
        });
      }

      return {
        subjectCourse: source,
      };
    },
  ),
});
