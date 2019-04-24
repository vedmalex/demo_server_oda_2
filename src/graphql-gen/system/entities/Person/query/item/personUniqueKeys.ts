import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input PersonUniqueKeys {
      id: ID
      spiritualName: String
      fullName: String
    }
  `,
});
