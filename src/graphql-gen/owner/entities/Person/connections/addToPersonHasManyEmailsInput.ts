import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input addToPersonHasManyEmailsInput {
      person: ID!
      email: ID!
      #additional Edge fields
    }
  `,
});
