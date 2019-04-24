import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input removeFromPhoneBelongsToUpdateByInput {
      user: ID!
      phone: ID!
    }
  `,
});
