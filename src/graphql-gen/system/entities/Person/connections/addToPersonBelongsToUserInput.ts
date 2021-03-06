import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input addToPersonBelongsToUserInput {
      person: ID!
      user: ID!
      #additional Edge fields
    }
  `,
});
