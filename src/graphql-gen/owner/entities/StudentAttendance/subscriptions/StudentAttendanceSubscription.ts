import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type StudentAttendanceSubscription {
      mutation: MutationKind!
      node: StudentAttendance!
      payload: StudentAttendanceSubscriptionPayload
      updatedFields: [String]
      previous: UpdateStudentAttendanceSubscriptionPayload
    }
  `,
});
