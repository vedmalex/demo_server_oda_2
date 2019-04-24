import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input addToStudentBelongsToCreatedByInput {
      student: ID!
      user: ID!
      #additional Edge fields
    }
  `,
});
