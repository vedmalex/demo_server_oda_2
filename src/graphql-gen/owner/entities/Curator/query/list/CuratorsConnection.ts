import { Type } from '../../../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type CuratorsConnection {
      pageInfo: PageInfo!
      edges: [CuratorsEdge]
      # put here your additional connection fields
    }
  `,
});
