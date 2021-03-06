import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
} from '../../../../common';
import gql from 'graphql-tag';
import { merge } from 'lodash';

export default new Mutation({
  schema: gql`
    extend type Mutation {
      updateSocialNetwork(
        input: updateSocialNetworkInput!
      ): updateSocialNetworkPayload
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
      logger.trace('updateSocialNetwork');
      let payload = context.connectors.SocialNetwork.getPayload(args);

      let result;
      let previous;

      if (args.id) {
        previous = await context.connectors.SocialNetwork.findOneById(args.id);
        result = await context.connectors.SocialNetwork.findOneByIdAndUpdate(
          args.id,
          merge({}, previous, payload),
        );
      } else if (args.account) {
        delete payload.account;
        previous = await context.connectors.SocialNetwork.findOneByAccount(
          args.account,
        );
        result = await context.connectors.SocialNetwork.findOneByAccountAndUpdate(
          args.account,
          merge({}, previous, payload),
        );
      }

      if (!result) {
        throw new Error('item of type SocialNetwork is not found for update');
      }

      if (context.pubsub) {
        context.pubsub.publish('SocialNetwork', {
          SocialNetwork: {
            mutation: 'UPDATE',
            node: result,
            previous,
            updatedFields: Object.keys(payload).filter(
              f => payload[f] !== undefined,
            ),
            payload: args,
          },
        });
      }

      return {
        socialNetwork: result,
      };
    },
  ),
});
