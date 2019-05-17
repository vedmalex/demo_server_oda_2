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
      Group(filter: GroupFilterSubscriptions): GroupSubscription
    }
  `,
  resolver: {
    subscribe: Filter.withContext(
      withFilter(
        () => pubsub.asyncIterator('Group'),
        ({ Group }, args, context, info) => {
          let allow = context.connectors.Group.secure('read', {
            source: Group.node,
          });
          if (allow) {
            return filterIt(Group, context.queryCheck);
          } else {
            return false;
          }
        },
      ),
      {
        id: 'id',
        course: 'course',
        curator: 'curator',
      },
    ),
  },
});
