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
      Course(filter: CourseFilterSubscriptions): CourseSubscription
    }
  `,
  resolver: {
    subscribe: Filter.withContext(
      withFilter(
        () => pubsub.asyncIterator('Course'),
        ({ Course }, args, context, info) => {
          let allow = context.connectors.Course.secure('read', {
            source: Course.node,
          });
          if (allow) {
            return filterIt(Course, context.queryCheck);
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
