import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input createUserInput {
      id: ID
      isAdmin: Boolean
      isSystem: Boolean
      enabled: Boolean
    }
  `,
});
