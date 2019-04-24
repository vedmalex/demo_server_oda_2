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
      removeFromCuratorBelongsToCreatedBy(
        input: removeFromCuratorBelongsToCreatedByInput
      ): removeFromCuratorBelongsToCreatedByPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        curator?: string;
        user?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('removeFromCuratorBelongsToCreatedBy');
      let curator = args.curator;
      let user = args.user;
      let payload = {
        curator,
        user,
      };
      await context.connectors.Curator.removeFromCreatedBy(payload);

      let source = await context.connectors.Curator.findOneById(curator);

      if (context.pubsub) {
        context.pubsub.publish('Curator', {
          Curator: {
            mutation: 'UNLINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                curator: args.curator,
                user: args.user,
              },
              relation: 'createdBy',
            },
          },
        });
      }

      return {
        curator: source,
      };
    },
  ),
});
