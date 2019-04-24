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
      addToSubjectCourseBelongsToCreatedBy(
        input: addToSubjectCourseBelongsToCreatedByInput
      ): addToSubjectCourseBelongsToCreatedByPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        subjectCourse?: string;
        user?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('addToSubjectCourseBelongsToCreatedBy');
      let subjectCourse = args.subjectCourse;
      let user = args.user;
      let payload = {
        subjectCourse,
        user,
      };

      await context.connectors.SubjectCourse.addToCreatedBy(payload);

      let source = await context.connectors.SubjectCourse.findOneById(
        subjectCourse,
      );

      if (context.pubsub) {
        context.pubsub.publish('SubjectCourse', {
          SubjectCourse: {
            mutation: 'LINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                subjectCourse: args.subjectCourse,
                user: args.user,
              },
              relation: 'createdBy',
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
