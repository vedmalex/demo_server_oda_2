import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input StudentAttendanceFilterSubscriptions {
      or: [StudentAttendanceFilterSubscriptions]
      and: [StudentAttendanceFilterSubscriptions]
      mutation: WhereMutationKind
      node: StudentAttendanceFilterSubscriptionsItem
      previous: StudentAttendanceFilterSubscriptionsItem
      updatedFields: WhereListOfStrings
    }
  `,
});
