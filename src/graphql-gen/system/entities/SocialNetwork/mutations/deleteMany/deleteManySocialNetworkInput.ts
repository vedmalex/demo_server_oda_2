import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input deleteManySocialNetworkInput {
      id: ID
      account: String
    }
  `,
});
