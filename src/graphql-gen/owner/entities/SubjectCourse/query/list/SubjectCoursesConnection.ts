import { Type } from '../../../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type SubjectCoursesConnection {
      pageInfo: PageInfo!
      edges: [SubjectCoursesEdge]
      # put here your additional connection fields
    }
  `,
});
