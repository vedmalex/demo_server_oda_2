import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input embedPhoneInput {
      id: ID
      phoneNumber: String
      type: CommunicationType
      person: embedPersonInput
    }
  `,
});
