import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input removeFromEmailBelongsToUpdateByInput {
      user: ID!
      email: ID!
    }
  `,
});
