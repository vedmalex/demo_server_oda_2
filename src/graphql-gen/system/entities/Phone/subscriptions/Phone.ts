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
      Phone(filter: PhoneFilterSubscriptions): PhoneSubscription
    }
  `,
  resolver: {
    subscribe: Filter.withContext(
      withFilter(
        () => pubsub.asyncIterator('Phone'),
        ({ Phone }, args, context, info) => {
          let allow = context.connectors.Phone.secure('read', {
            source: Phone.node,
          });
          if (allow) {
            return filterIt(Phone, context.queryCheck);
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
