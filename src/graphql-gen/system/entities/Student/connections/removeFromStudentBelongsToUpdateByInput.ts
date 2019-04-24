import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input removeFromStudentBelongsToUpdateByInput {
      user: ID!
      student: ID!
    }
  `,
});
