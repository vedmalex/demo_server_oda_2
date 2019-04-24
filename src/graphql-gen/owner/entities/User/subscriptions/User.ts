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
      User(filter: UserFilterSubscriptions): UserSubscription
    }
  `,
  resolver: {
    subscribe: Filter.withContext(
      withFilter(
        () => pubsub.asyncIterator('User'),
        ({ User }, args, context, info) => {
          let allow = context.connectors.User.secure('read', {
            source: User.node,
          });
          if (allow) {
            return filterIt(User, context.queryCheck);
          } else {
            return false;
          }
        },
      ),
      {
        id: 'id',
      },
    ),
  },
});
