import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input removeFromStudentBelongsToGroupInput {
      group: ID!
      student: ID!
    }
  `,
});
