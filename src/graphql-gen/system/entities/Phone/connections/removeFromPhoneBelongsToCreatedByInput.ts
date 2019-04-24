import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input removeFromPhoneBelongsToCreatedByInput {
      user: ID!
      phone: ID!
    }
  `,
});
