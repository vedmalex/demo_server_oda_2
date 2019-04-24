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
      StudentAttendance(
        filter: StudentAttendanceFilterSubscriptions
      ): StudentAttendanceSubscription
    }
  `,
  resolver: {
    subscribe: Filter.withContext(
      withFilter(
        () => pubsub.asyncIterator('StudentAttendance'),
        ({ StudentAttendance }, args, context, info) => {
          let allow = context.connectors.StudentAttendance.secure('read', {
            source: StudentAttendance.node,
          });
          if (allow) {
            return filterIt(StudentAttendance, context.queryCheck);
          } else {
            return false;
          }
        },
      ),
      {
        id: 'id',
        meetingLink: 'meetingLink',
        studentLink: 'studentLink',
      },
    ),
  },
});
