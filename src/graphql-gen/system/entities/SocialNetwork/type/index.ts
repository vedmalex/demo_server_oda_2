import _ from 'lodash';
import { get } from 'lodash';

import { RegisterConnectors } from '../../../common';
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
      # # Person

      person: Person
    }
  `,
  resolver: {
    id: ({ id }) => id,

    person: async (
      { id }, // owner id
      args: {
        limit?: number;
        skip?: number;
        first?: number;
        after?: string;
        last?: number;
        before?: string;
        filter?: {
          [k: string]: any;
        };
        orderBy?: string | string[];
      },
      context: { connectors: RegisterConnectors },
      info,
    ) => {
      let result;
      let selectionSet = traverse(info);

      let socialNetwork = await context.connectors.SocialNetwork.findOneById(
        id,
      );
      //BelongsTo
      if (socialNetwork && socialNetwork.person) {
        result = await context.connectors.Person.findOneById(
          socialNetwork.person,
        );
      }

      return result;
    },
  },
});
