import { Type } from '../../../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type GroupsConnection {
      pageInfo: PageInfo!
      edges: [GroupsEdge]
      # put here your additional connection fields
    }
  `,
});
