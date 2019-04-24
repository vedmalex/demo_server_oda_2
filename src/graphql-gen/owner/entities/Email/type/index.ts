import * as _ from 'lodash';
import { get } from 'lodash';

import { RegisterConnectors } from '../../../common';
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

      let email = await context.connectors.Email.findOneById(id);
      //BelongsTo
      if (email && email.person) {
        result = await context.connectors.Person.findOneById(email.person);
      }

      return result;
    },
  },
});
