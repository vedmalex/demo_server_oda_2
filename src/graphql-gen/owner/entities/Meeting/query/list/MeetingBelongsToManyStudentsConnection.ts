import { Type } from '../../../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type MeetingBelongsToManyStudentsConnection {
      pageInfo: PageInfo!
      edges: [MeetingBelongsToManyStudentsEdge]
      # put here your additional connection fields
    }
  `,
});
