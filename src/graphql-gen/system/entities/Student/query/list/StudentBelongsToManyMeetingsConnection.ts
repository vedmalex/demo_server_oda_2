import { Type } from '../../../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type StudentBelongsToManyMeetingsConnection {
      pageInfo: PageInfo!
      edges: [StudentBelongsToManyMeetingsEdge]
      # put here your additional connection fields
    }
  `,
});
