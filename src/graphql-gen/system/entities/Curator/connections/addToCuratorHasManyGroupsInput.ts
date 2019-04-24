import { Input } from '../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input addToCuratorHasManyGroupsInput {
      curator: ID!
      group: ID!
      #additional Edge fields
    }
  `,
});
