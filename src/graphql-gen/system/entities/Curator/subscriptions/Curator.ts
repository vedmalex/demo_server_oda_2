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
    extend type Subscription {
      Curator(filter: CuratorFilterSubscriptions): CuratorSubscription
    }
  `,
  resolver: {
    subscribe: Filter.withContext(
      withFilter(
        () => pubsub.asyncIterator('Curator'),
        ({ Curator }, args, context, info) => {
          let allow = context.connectors.Curator.secure('read', {
            source: Curator.node,
          });
          if (allow) {
            return filterIt(Curator, context.queryCheck);
          } else {
            return false;
          }
        },
      ),
      {
        id: 'id',
        person: 'person',
      },
    ),
  },
});
