import { Type } from '../../../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type MeetingsConnection {
      pageInfo: PageInfo!
      edges: [MeetingsEdge]
      # put here your additional connection fields
    }
  `,
});
