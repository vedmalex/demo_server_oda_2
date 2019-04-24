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
      removeFromSocialNetworkBelongsToUpdateBy(
        input: removeFromSocialNetworkBelongsToUpdateByInput
      ): removeFromSocialNetworkBelongsToUpdateByPayload
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
      logger.trace('removeFromSocialNetworkBelongsToUpdateBy');
      let socialNetwork = args.socialNetwork;
      let user = args.user;
      let payload = {
        socialNetwork,
        user,
      };
      await context.connectors.SocialNetwork.removeFromUpdateBy(payload);

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
              relation: 'updateBy',
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
