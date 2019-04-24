import { Type } from '../../../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type PersonHasManyEmailsConnection {
      pageInfo: PageInfo!
      edges: [PersonHasManyEmailsEdge]
      # put here your additional connection fields
    }
  `,
});
