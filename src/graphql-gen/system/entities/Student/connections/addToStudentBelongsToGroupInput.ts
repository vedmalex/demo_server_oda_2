import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input addToStudentBelongsToGroupInput {
      student: ID!
      group: ID!
      #additional Edge fields
    }
  `,
});
