import { Type } from '../../../../common';
import gql from 'graphql-tag';
export default new Type({
  schema: gql`
    type SocialNetworksConnection {
      pageInfo: PageInfo!
      edges: [SocialNetworksEdge]
      # put here your additional connection fields
    }
  `,
});
