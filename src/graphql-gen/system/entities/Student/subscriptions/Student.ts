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
      Student(filter: StudentFilterSubscriptions): StudentSubscription
    }
  `,
  resolver: {
    subscribe: Filter.withContext(
      withFilter(
        () => pubsub.asyncIterator('Student'),
        ({ Student }, args, context, info) => {
          let allow = context.connectors.Student.secure('read', {
            source: Student.node,
          });
          if (allow) {
            return filterIt(Student, context.queryCheck);
          } else {
            return false;
          }
        },
      ),
      {
        id: 'id',
        person: 'person',
        group: 'group',
      },
    ),
  },
});
