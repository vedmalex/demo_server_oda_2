import { Type } from '../../../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type SubjectsEdge {
      node: Subject
      cursor: String!
      # put here your additiona edge fields
    }
  `,
});
