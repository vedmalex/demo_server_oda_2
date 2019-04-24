import { Type } from '../../../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type PeopleEdge {
      node: Person
      cursor: String!
      # put here your additiona edge fields
    }
  `,
});
