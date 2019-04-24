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
      Email(filter: EmailFilterSubscriptions): EmailSubscription
    }
  `,
  resolver: {
    subscribe: Filter.withContext(
      withFilter(
        () => pubsub.asyncIterator('Email'),
        ({ Email }, args, context, info) => {
          let allow = context.connectors.Email.secure('read', {
            source: Email.node,
          });
          if (allow) {
            return filterIt(Email, context.queryCheck);
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
