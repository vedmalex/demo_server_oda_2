import { Type } from '../../../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type UsersConnection {
      pageInfo: PageInfo!
      edges: [UsersEdge]
      # put here your additional connection fields
    }
  `,
});
