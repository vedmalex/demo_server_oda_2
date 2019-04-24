import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input embedStudentInput {
      id: ID
      person: embedPersonInput
      group: embedGroupInput
      meetings: [embedMeetingInput]
    }
  `,
});
