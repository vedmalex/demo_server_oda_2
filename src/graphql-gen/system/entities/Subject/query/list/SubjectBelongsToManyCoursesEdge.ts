import { Type } from '../../../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type SubjectBelongsToManyCoursesEdge {
      node: Course
      cursor: String!
      #additional Edge fields

      # # Hours
      hours: Float
      # # The Level Of Depth
      level: String
      # put here your additiona edge fields
    }
  `,
});
