import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input addToPersonHasOneAsCuratorInput {
      person: ID!
      curator: ID!
      #additional Edge fields
    }
  `,
});
