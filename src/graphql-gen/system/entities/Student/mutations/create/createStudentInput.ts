import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input createStudentInput {
      id: ID
      person: embedPersonInput
      group: embedGroupInput
      meetings: [embedMeetingInput]
    }
  `,
});
