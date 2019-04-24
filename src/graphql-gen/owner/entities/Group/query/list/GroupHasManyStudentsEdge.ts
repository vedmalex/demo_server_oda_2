import { Type } from '../../../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type GroupHasManyStudentsEdge {
      node: Student
      cursor: String!
      # put here your additiona edge fields
    }
  `,
});
