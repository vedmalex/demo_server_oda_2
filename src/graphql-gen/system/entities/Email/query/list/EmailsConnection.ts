import { Type } from '../../../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type EmailsConnection {
      pageInfo: PageInfo!
      edges: [EmailsEdge]
      # put here your additional connection fields
    }
  `,
});
