import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type UpdateStudentAttendanceSubscriptionPayload {
      id: ID
      meeting: String
      student: String
      present: Boolean
      specialNotes: String
    }
  `,
});
