import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  ensurePerson,
  linkSocialNetworkToPerson,
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
        person?: object /*Person*/;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('createSocialNetwork');
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

      if (args.person) {
        let $item = args.person as { id };
        if ($item) {
          let person = await ensurePerson({
            args: $item,
            context,
            create: true,
          });
          await linkSocialNetworkToPerson({
            context,
            person,
            socialNetwork: result,
          });
        }
      }

      return {
        socialNetwork: socialNetworkEdge,
      };
    },
  ),
});
