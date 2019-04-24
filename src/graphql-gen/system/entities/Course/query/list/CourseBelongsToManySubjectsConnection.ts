import { Type } from '../../../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type CourseBelongsToManySubjectsConnection {
      pageInfo: PageInfo!
      edges: [CourseBelongsToManySubjectsEdge]
      # put here your additional connection fields
    }
  `,
});
