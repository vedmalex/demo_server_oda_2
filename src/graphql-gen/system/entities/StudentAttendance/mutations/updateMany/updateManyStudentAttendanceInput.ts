import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input updateManyStudentAttendanceInput {
      id: ID
      meeting: String
      student: String
      present: Boolean
      specialNotes: String
      superpuper: String
      meetingLink: embedMeetingInput
      meetingLinkUnlink: embedMeetingInput
      meetingLinkCreate: createMeetingInput
      studentLink: embedStudentInput
      studentLinkUnlink: embedStudentInput
      studentLinkCreate: createStudentInput
    }
  `,
});
