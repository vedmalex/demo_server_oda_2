import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input addToPersonHasManySocialNetworksInput {
      person: ID!
      socialNetwork: ID!
      #additional Edge fields
    }
  `,
});
