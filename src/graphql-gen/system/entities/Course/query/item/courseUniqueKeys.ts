import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input CourseUniqueKeys {
      id: ID
      name: String
    }
  `,
});
