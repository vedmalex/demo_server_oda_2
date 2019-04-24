import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input SocialNetworkUniqueKeys {
      id: ID
      account: String
    }
  `,
});
