import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input embedStudentCreateIntoMeetingStudentsInput {
      id: ID
      createdAt: Date
      updatedAt: Date
      removed: Boolean
      owner: String
      present: Boolean
      specialNotes: String
      superpuper: String
      person: embedPersonInput
      group: embedGroupInput
      meetings: [embedMeetingInput]
      createdBy: embedUserInput
      updateBy: embedUserInput
    }
  `,
});
