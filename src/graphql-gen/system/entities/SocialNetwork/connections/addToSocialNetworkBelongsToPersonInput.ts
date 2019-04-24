import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input addToSocialNetworkBelongsToPersonInput {
      socialNetwork: ID!
      person: ID!
      #additional Edge fields
    }
  `,
});
