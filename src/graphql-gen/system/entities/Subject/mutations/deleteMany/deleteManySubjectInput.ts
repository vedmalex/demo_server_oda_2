import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input deleteManySubjectInput {
      id: ID
      name: String
    }
  `,
});
