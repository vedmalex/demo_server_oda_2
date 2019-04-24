import * as _ from 'lodash';
import { get } from 'lodash';
import { Type, traverse, logger } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  schema: gql`
    type User {
      # # User Name
      userName: String!
      # # Password
      password: String!
      # # Is Admin
      isAdmin: Boolean
      # # Is System
      isSystem: Boolean
      # # Enabled
      enabled: Boolean
      # # Id
      id: ID!
    }
  `,
  resolver: {
    id: ({ id }) => id,
  },
});
