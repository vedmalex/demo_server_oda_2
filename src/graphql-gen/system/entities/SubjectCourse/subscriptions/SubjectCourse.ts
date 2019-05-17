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
      SubjectCourse(
        filter: SubjectCourseFilterSubscriptions
      ): SubjectCourseSubscription
    }
  `,
  resolver: {
    subscribe: Filter.withContext(
      withFilter(
        () => pubsub.asyncIterator('SubjectCourse'),
        ({ SubjectCourse }, args, context, info) => {
          let allow = context.connectors.SubjectCourse.secure('read', {
            source: SubjectCourse.node,
          });
          if (allow) {
            return filterIt(SubjectCourse, context.queryCheck);
          } else {
            return false;
          }
        },
      ),
      {
        id: 'id',
        subjectLink: 'subjectLink',
        courseLink: 'courseLink',
      },
    ),
  },
});
