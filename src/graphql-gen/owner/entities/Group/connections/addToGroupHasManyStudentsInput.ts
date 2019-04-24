import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input addToGroupHasManyStudentsInput {
      group: ID!
      student: ID!
      #additional Edge fields
    }
  `,
});
