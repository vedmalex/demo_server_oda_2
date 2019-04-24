import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input addToEmailBelongsToPersonInput {
      email: ID!
      person: ID!
      #additional Edge fields
    }
  `,
});
