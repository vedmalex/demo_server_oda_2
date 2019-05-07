import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input updateManySocialNetworkInput {
      id: ID
      account: String
      url: String
      type: SocialNetworkType
    }
  `,
});
