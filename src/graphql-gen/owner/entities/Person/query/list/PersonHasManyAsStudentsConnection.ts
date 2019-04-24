import { Type } from '../../../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type PersonHasManyAsStudentsConnection {
      pageInfo: PageInfo!
      edges: [PersonHasManyAsStudentsEdge]
      # put here your additional connection fields
    }
  `,
});
