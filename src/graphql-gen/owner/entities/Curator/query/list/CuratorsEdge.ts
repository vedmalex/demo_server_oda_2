import { Type } from '../../../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type CuratorsEdge {
      node: Curator
      cursor: String!
      # put here your additiona edge fields
    }
  `,
});
