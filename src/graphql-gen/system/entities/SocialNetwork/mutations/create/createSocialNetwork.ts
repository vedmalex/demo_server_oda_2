import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
} from '../../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      createSocialNetwork(
        input: createSocialNetworkInput!
      ): createSocialNetworkPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        account?: string;
        url?: string;
        type?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      const needCommit = await context.connectors.ensureTransaction();
      const txn = await context.connectors.transaction;
      logger.trace('createSocialNetwork');
      try {
        let create = context.connectors.SocialNetwork.getPayload(args, false);

        let result = await context.connectors.SocialNetwork.create(create);

        if (context.pubsub) {
          context.pubsub.publish('SocialNetwork', {
            SocialNetwork: {
              mutation: 'CREATE',
              node: result,
              previous: null,
              updatedFields: [],
              payload: args,
            },
          });
        }

        let socialNetworkEdge = {
          cursor: result.id,
          node: result,
        };

        if (needCommit) {
          return txn.commit().then(() => ({
            socialNetwork: socialNetworkEdge,
          }));
        } else {
          return {
            socialNetwork: socialNetworkEdge,
          };
        }
      } catch (e) {
        await txn.abort();
        throw e;
      }
    },
  ),
});
