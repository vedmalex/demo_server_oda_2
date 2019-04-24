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
      removeFromSubjectCourseBelongsToCreatedBy(
        input: removeFromSubjectCourseBelongsToCreatedByInput
      ): removeFromSubjectCourseBelongsToCreatedByPayload
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
      logger.trace('removeFromSubjectCourseBelongsToCreatedBy');
      let subjectCourse = args.subjectCourse;
      let user = args.user;
      let payload = {
        subjectCourse,
        user,
      };
      await context.connectors.SubjectCourse.removeFromCreatedBy(payload);

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
