import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input addToStudentAttendanceBelongsToStudentLinkInput {
      studentAttendance: ID!
      student: ID!
      #additional Edge fields
    }
  `,
});
