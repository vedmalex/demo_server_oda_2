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
      Person(filter: PersonFilterSubscriptions): PersonSubscription
    }
  `,
  resolver: {
    subscribe: Filter.withContext(
      withFilter(
        () => pubsub.asyncIterator('Person'),
        ({ Person }, args, context, info) => {
          let allow = context.connectors.Person.secure('read', {
            source: Person.node,
          });
          if (allow) {
            return filterIt(Person, context.queryCheck);
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
