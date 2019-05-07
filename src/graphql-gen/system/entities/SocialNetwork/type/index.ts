import _ from 'lodash';
import { get } from 'lodash';
import { Type, traverse, logger } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  schema: gql`
    type SocialNetwork {
      # # Account
      account: String!
      # # Url
      url: String
      # # Type
      type: SocialNetworkType
      # # Id
      id: ID!
    }
  `,
  resolver: {
    id: ({ id }) => id,
  },
});
