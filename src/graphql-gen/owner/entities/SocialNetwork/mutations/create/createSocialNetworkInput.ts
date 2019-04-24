import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input createSocialNetworkInput {
      id: ID
      account: String!
      url: String
      type: SocialNetworkType
      person: embedPersonInput
    }
  `,
});
