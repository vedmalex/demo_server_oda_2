import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input embedUserInput {
      id: ID
      userName: String
      password: String
    }
  `,
});
