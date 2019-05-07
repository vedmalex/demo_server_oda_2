import _ from 'lodash';
import { get } from 'lodash';

import { RegisterConnectors } from '../../../common';
import {
  emptyConnection,
  pagination,
  detectCursorDirection,
  consts,
  Filter,
} from 'oda-api-graphql';
import { Type, traverse, logger } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  schema: gql`
    type Person {
      # # Spiritual Name
      spiritualName: String!
      # # Full Name
      fullName: String!
      # # Date Of Birth
      dateOfBirth: Date
      # # Ages
      ages: Float
      # # Special Notes
      specialNotes: String
      # # Id
      id: ID!
      # # User

      user: User

      # # Social Networks
      socialNetworks: [SocialNetwork]
      # # Phones
      phones: [Phone]
      # # Emails
      emails: [Email]
      # # As Students

      asStudents(
        after: String
        first: Int
        before: String
        last: Int
        limit: Int
        skip: Int
        orderBy: [StudentSortOrder]
        filter: StudentComplexFilter
      ): PersonHasManyAsStudentsConnection
      # # As Curator

      asCurator: Curator
    }
  `,
  resolver: {
    id: ({ id }) => id,
    socialNetworks: async (
      { socialNetworks },
      args: object,
      context: { connectors: RegisterConnectors },
      info,
    ) => {
      return socialNetworks.map(
        context.connectors.SocialNetwork.ensureId.bind(
          context.connectors.SocialNetwork,
        ),
      );
    },
    phones: async (
      { phones },
      args: object,
      context: { connectors: RegisterConnectors },
      info,
    ) => {
      return phones.map(
        context.connectors.Phone.ensureId.bind(context.connectors.Phone),
      );
    },
    emails: async (
      { emails },
      args: object,
      context: { connectors: RegisterConnectors },
      info,
    ) => {
      return emails.map(
        context.connectors.Email.ensureId.bind(context.connectors.Email),
      );
    },

    user: async (
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

      let person = await context.connectors.Person.findOneById(id);
      //BelongsTo
      if (person && person.user) {
        result = await context.connectors.User.findOneById(person.user);
      }

      return result;
    },
    asStudents: async (
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

      let person = await context.connectors.Person.findOneById(id);
      //HasMany
      let idMap = {
        id: '_id',
        person: 'person',
        group: 'group',
      };
      if (person && person.id) {
        if (!args.filter) {
          args.filter = {};
        }
        args.filter.person = {
          eq: person.id,
        };
        let list = get(selectionSet, 'edges.node')
          ? await context.connectors.Student.getList({
              ...args,
              idMap,
            })
          : [];

        if (list.length > 0) {
          let cursor = pagination(args);
          let direction = detectCursorDirection(args)._id;
          let edges = list.map(l => {
            return {
              cursor: l.id,
              node: l,
            };
          });

          let pageInfo = get(selectionSet, 'pageInfo')
            ? {
                startCursor: get(selectionSet, 'pageInfo.startCursor')
                  ? edges[0].cursor
                  : undefined,
                endCursor: get(selectionSet, 'pageInfo.endCursor')
                  ? edges[edges.length - 1].cursor
                  : undefined,
                hasPreviousPage: get(selectionSet, 'pageInfo.hasPreviousPage')
                  ? direction === consts.DIRECTION.BACKWARD
                    ? list.length === cursor.limit
                    : false
                  : undefined,
                hasNextPage: get(selectionSet, 'pageInfo.hasNextPage')
                  ? direction === consts.DIRECTION.FORWARD
                    ? list.length === cursor.limit
                    : false
                  : undefined,
                count: get(selectionSet, 'pageInfo.count')
                  ? await context.connectors.Student.getCount({
                      ...args,
                      idMap,
                    })
                  : 0,
              }
            : null;

          result = {
            edges,
            pageInfo,
          };
        } else {
          result = emptyConnection();
        }
      }

      return result;
    },
    asCurator: async (
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

      let person = await context.connectors.Person.findOneById(id);
      //HasOne
      if (person && person.id) {
        let curator = await context.connectors.Curator.getList({
          filter: {
            person: {
              eq: person.id,
            },
          },
        });
        result = curator[0];
      }

      return result;
    },
    ages: async (
      { id }, // owner id
      args,
      context: { connectors: RegisterConnectors },
      info,
    ) => {
      let result;

      // let person = await context.connectors.Person.findOneById(id);
      result = undefined;
      // place your custom code here

      return result;
    },
  },
});
