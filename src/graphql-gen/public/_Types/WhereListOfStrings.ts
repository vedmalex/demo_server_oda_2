import { Input } from '../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input WhereListOfStrings {
      contains: String
      some: [String!]
      every: [String!]
      except: String
      none: [String!]
    }
  `,
});
