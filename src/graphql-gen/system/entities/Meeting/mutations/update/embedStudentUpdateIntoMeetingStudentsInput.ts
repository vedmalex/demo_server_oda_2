import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input embedStudentUpdateIntoMeetingStudentsInput {
      id: ID
      present: Boolean
      specialNotes: String
      superpuper: String
      person: embedPersonInput
      group: embedGroupInput
      meetings: [embedMeetingInput]
    }
  `,
});
