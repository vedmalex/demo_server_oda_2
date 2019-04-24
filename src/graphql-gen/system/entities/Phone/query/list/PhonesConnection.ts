import { Type } from '../../../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type PhonesConnection {
      pageInfo: PageInfo!
      edges: [PhonesEdge]
      # put here your additional connection fields
    }
  `,
});
