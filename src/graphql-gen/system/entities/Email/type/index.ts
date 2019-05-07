import _ from 'lodash';
import { get } from 'lodash';
import { Type, traverse, logger } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  schema: gql`
    type Email {
      # # Email
      email: String!
      # # Type
      type: CommunicationType
      # # Id
      id: ID!
    }
  `,
  resolver: {
    id: ({ id }) => id,
  },
});
