import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input deleteManyPersonInput {
      id: ID
      spiritualName: String
      fullName: String
    }
  `,
});
