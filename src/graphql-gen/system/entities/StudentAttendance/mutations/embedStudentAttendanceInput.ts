import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input embedStudentAttendanceInput {
      id: ID
      meeting: String
      student: String
      present: Boolean
      specialNotes: String
      superpuper: String
      meetingLink: embedMeetingInput
      studentLink: embedStudentInput
    }
  `,
});
