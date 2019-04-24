import { Type } from '../../../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type PeopleConnection {
      pageInfo: PageInfo!
      edges: [PeopleEdge]
      # put here your additional connection fields
    }
  `,
});
