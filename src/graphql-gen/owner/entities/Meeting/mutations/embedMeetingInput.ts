import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input embedMeetingInput {
      id: ID
      date: Date
      curator: embedCuratorInput
      group: embedGroupInput
      students: [embedStudentUpdateIntoMeetingStudentsInput]
    }
  `,
});
