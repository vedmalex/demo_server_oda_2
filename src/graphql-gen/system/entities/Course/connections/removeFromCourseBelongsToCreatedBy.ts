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
      removeFromCourseBelongsToCreatedBy(
        input: removeFromCourseBelongsToCreatedByInput
      ): removeFromCourseBelongsToCreatedByPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        course?: string;
        user?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('removeFromCourseBelongsToCreatedBy');
      let course = args.course;
      let user = args.user;
      let payload = {
        course,
        user,
      };
      await context.connectors.Course.removeFromCreatedBy(payload);

      let source = await context.connectors.Course.findOneById(course);

      if (context.pubsub) {
        context.pubsub.publish('Course', {
          Course: {
            mutation: 'UNLINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                course: args.course,
                user: args.user,
              },
              relation: 'createdBy',
            },
          },
        });
      }

      return {
        course: source,
      };
    },
  ),
});
