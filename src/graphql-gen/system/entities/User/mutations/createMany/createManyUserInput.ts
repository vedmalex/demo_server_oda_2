import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input createManyUserInput {
      id: ID
      userName: String!
      password: String!
      isAdmin: Boolean
      isSystem: Boolean
      enabled: Boolean
    }
  `,
});
