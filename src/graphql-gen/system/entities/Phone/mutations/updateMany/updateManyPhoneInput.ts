import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input updateManyPhoneInput {
      id: ID
      phoneNumber: String
      type: CommunicationType
    }
  `,
});
