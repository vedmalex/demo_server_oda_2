import { Type } from '../../../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type PersonHasManyAsStudentsEdge {
      node: Student
      cursor: String!
      # put here your additiona edge fields
    }
  `,
});
