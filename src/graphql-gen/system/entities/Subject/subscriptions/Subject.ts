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
      Subject(filter: SubjectFilterSubscriptions): SubjectSubscription
    }
  `,
  resolver: {
    subscribe: Filter.withContext(
      withFilter(
        () => pubsub.asyncIterator('Subject'),
        ({ Subject }, args, context, info) => {
          let allow = context.connectors.Subject.secure('read', {
            source: Subject.node,
          });
          if (allow) {
            return filterIt(Subject, context.queryCheck);
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
