import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  unlinkSocialNetworkFromAll,
} from '../../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type Mutation {
      deleteSocialNetwork(
        input: deleteSocialNetworkInput!
      ): deleteSocialNetworkPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        account?: string;
      },
      context: {
        connectors: RegisterConnectors;
        pubsub: PubSubEngine;
        userGQL: (args: any) => Promise<any>;
      },
      info,
    ) => {
      logger.trace('deleteSocialNetwork');
      let result;
      let deletePromise = [];
      if (args.id) {
        deletePromise.push(
          unlinkSocialNetworkFromAll(
            [
              {
                key: 'id',
                type: 'ID',
                value: args.id,
              },
            ],
            context,
          ),
        );
        deletePromise.push(
          context.connectors.SocialNetwork.findOneByIdAndRemove(args.id).then(
            res => (result = res),
          ),
        );
      } else if (args.account) {
        deletePromise.push(
          unlinkSocialNetworkFromAll(
            [
              {
                key: 'account',
                type: 'String',
                value: args.account,
              },
            ],
            context,
          ),
        );
        deletePromise.push(
          context.connectors.SocialNetwork.findOneByAccountAndRemove(
            args.account,
          ).then(res => (result = res)),
        );
      }

      await Promise.all(deletePromise);

      if (!result) {
        throw new Error('item of type SocialNetwork is not found for delete');
      }

      if (context.pubsub) {
        context.pubsub.publish('SocialNetwork', {
          SocialNetwork: {
            mutation: 'DELETE',
            node: result,
            previous: null,
            updatedFields: [],
            payload: args,
          },
        });
      }

      return {
        deletedItemId: result.id,
        socialNetwork: result,
      };
    },
  ),
});
