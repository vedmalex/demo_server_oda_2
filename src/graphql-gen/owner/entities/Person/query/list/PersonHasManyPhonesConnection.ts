import { Type } from '../../../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type PersonHasManyPhonesConnection {
      pageInfo: PageInfo!
      edges: [PersonHasManyPhonesEdge]
      # put here your additional connection fields
    }
  `,
});
