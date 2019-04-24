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
      addToSocialNetworkBelongsToUpdateBy(
        input: addToSocialNetworkBelongsToUpdateByInput
      ): addToSocialNetworkBelongsToUpdateByPayload
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
      logger.trace('addToSocialNetworkBelongsToUpdateBy');
      let socialNetwork = args.socialNetwork;
      let user = args.user;
      let payload = {
        socialNetwork,
        user,
      };

      await context.connectors.SocialNetwork.addToUpdateBy(payload);

      let source = await context.connectors.SocialNetwork.findOneById(
        socialNetwork,
      );

      if (context.pubsub) {
        context.pubsub.publish('SocialNetwork', {
          SocialNetwork: {
            mutation: 'LINK',
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
