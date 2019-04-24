import { Type } from '../../../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type StudentAttendancesConnection {
      pageInfo: PageInfo!
      edges: [StudentAttendancesEdge]
      # put here your additional connection fields
    }
  `,
});
