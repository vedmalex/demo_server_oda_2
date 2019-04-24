import { Type } from '../../../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type SubjectsConnection {
      pageInfo: PageInfo!
      edges: [SubjectsEdge]
      # put here your additional connection fields
    }
  `,
});
