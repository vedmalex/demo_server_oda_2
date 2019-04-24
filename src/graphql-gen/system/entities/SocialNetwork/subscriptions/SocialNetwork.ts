import {
  ModelType,
  Subscription,
  Filter,
  filterIt,
  pubsub,
  withFilter,
} from '../../../common';
import gql from 'graphql-tag';

export default new Subscription({
  type: ModelType.type,
  schema: gql`
    extend type RootSubscription {
      SocialNetwork(
        filter: SocialNetworkFilterSubscriptions
      ): SocialNetworkSubscription
    }
  `,
  resolver: {
    subscribe: Filter.withContext(
      withFilter(
        () => pubsub.asyncIterator('SocialNetwork'),
        ({ SocialNetwork }, args, context, info) => {
          let allow = context.connectors.SocialNetwork.secure('read', {
            source: SocialNetwork.node,
          });
          if (allow) {
            return filterIt(SocialNetwork, context.queryCheck);
          } else {
            return false;
          }
        },
      ),
      {
        id: 'id',
        createdBy: 'createdBy',
        updateBy: 'updateBy',
      },
    ),
  },
});
