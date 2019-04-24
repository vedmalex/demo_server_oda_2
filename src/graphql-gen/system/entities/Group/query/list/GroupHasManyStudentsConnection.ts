import { Type } from '../../../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type GroupHasManyStudentsConnection {
      pageInfo: PageInfo!
      edges: [GroupHasManyStudentsEdge]
      # put here your additional connection fields
    }
  `,
});
