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
      removeFromSocialNetworkBelongsToCreatedBy(
        input: removeFromSocialNetworkBelongsToCreatedByInput
      ): removeFromSocialNetworkBelongsToCreatedByPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        socialNetwork?: string;
        user?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('removeFromSocialNetworkBelongsToCreatedBy');
      let socialNetwork = args.socialNetwork;
      let user = args.user;
      let payload = {
        socialNetwork,
        user,
      };
      await context.connectors.SocialNetwork.removeFromCreatedBy(payload);

      let source = await context.connectors.SocialNetwork.findOneById(
        socialNetwork,
      );

      if (context.pubsub) {
        context.pubsub.publish('SocialNetwork', {
          SocialNetwork: {
            mutation: 'UNLINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                socialNetwork: args.socialNetwork,
                user: args.user,
              },
              relation: 'createdBy',
            },
          },
        });
      }

      return {
        socialNetwork: source,
      };
    },
  ),
});
