import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input removeFromCuratorBelongsToCreatedByInput {
      user: ID!
      curator: ID!
    }
  `,
});
