import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input embedEmailInput {
      id: ID
      email: String
      type: CommunicationType
    }
  `,
});
