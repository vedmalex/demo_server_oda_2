import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input addToPersonHasManyAsStudentsInput {
      person: ID!
      student: ID!
      #additional Edge fields
    }
  `,
});
