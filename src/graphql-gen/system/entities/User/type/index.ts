import * as _ from 'lodash';
import { get } from 'lodash';
import { Type, traverse, logger } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  schema: gql`
    type User {
      # # Is Admin
      isAdmin: Boolean
      # # Is System
      isSystem: Boolean
      # # Enabled
      enabled: Boolean
    }
  `,
  resolver: {
    id: ({ id }) => id,
  },
});
