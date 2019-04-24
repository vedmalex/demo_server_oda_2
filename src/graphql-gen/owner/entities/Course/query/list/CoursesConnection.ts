import { Type } from '../../../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type CoursesConnection {
      pageInfo: PageInfo!
      edges: [CoursesEdge]
      # put here your additional connection fields
    }
  `,
});
