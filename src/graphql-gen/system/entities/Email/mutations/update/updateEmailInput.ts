import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input updateEmailInput {
      id: ID
      email: String
      type: CommunicationType
      person: embedPersonInput
      personUnlink: embedPersonInput
      personCreate: createPersonInput
    }
  `,
});
