import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input updateManyEmailInput {
      id: ID
      email: String
      type: CommunicationType
    }
  `,
});
