import { Type } from '../../../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type CuratorHasManyGroupsConnection {
      pageInfo: PageInfo!
      edges: [CuratorHasManyGroupsEdge]
      # put here your additional connection fields
    }
  `,
});
