import { Type } from '../../../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type PersonHasManySocialNetworksConnection {
      pageInfo: PageInfo!
      edges: [PersonHasManySocialNetworksEdge]
      # put here your additional connection fields
    }
  `,
});
