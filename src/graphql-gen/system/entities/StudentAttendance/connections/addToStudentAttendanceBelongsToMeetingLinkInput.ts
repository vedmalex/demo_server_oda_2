import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input addToStudentAttendanceBelongsToMeetingLinkInput {
      studentAttendance: ID!
      meeting: ID!
      #additional Edge fields
    }
  `,
});
