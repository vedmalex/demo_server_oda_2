import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input createManyPhoneInput {
      id: ID
      phoneNumber: String!
      type: CommunicationType
    }
  `,
});
