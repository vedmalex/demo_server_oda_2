import { Type } from '../../../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type CourseHasManyGroupsConnection {
      pageInfo: PageInfo!
      edges: [CourseHasManyGroupsEdge]
      # put here your additional connection fields
    }
  `,
});
