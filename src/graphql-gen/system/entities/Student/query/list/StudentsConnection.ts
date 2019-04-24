import { Type } from '../../../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type StudentsConnection {
      pageInfo: PageInfo!
      edges: [StudentsEdge]
      # put here your additional connection fields
    }
  `,
});
