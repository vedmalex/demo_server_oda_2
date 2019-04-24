import { Type } from '../../../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type SubjectBelongsToManyCoursesConnection {
      pageInfo: PageInfo!
      edges: [SubjectBelongsToManyCoursesEdge]
      # put here your additional connection fields
    }
  `,
});
