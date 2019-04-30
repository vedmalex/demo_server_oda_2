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
    type Curator {
      # # Spiritual Name
      spiritualName: String
      # # Full Name
      fullName: String
      # # Id
      id: ID!
      # # Person

      person: Person

      # # Groups

      groups(
        after: String
        first: Int
        before: String
        last: Int
        limit: Int
        skip: Int
        orderBy: [GroupSortOrder]
        filter: GroupComplexFilter
      ): CuratorHasManyGroupsConnection
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

      let curator = await context.connectors.Curator.findOneById(id);
      //BelongsTo
      if (curator && curator.person) {
        result = await context.connectors.Person.findOneById(curator.person);
      }

      return result;
    },
    groups: async (
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

      let curator = await context.connectors.Curator.findOneById(id);
      //HasMany
      let idMap = {
        id: '_id',
        course: 'course',
        curator: 'curator',
      };
      if (curator && curator.id) {
        if (!args.filter) {
          args.filter = {};
        }
        args.filter.curator = {
          eq: curator.id,
        };
        let list = get(selectionSet, 'edges.node')
          ? await context.connectors.Group.getList({
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
                  ? await context.connectors.Group.getCount({
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
    spiritualName: async (
      { id }, // owner id
      args,
      context: { connectors: RegisterConnectors },
      info,
    ) => {
      let result;

      // let curator = await context.connectors.Curator.findOneById(id);
      result = undefined;
      // place your custom code here

      return result;
    },
    fullName: async (
      { id }, // owner id
      args,
      context: { connectors: RegisterConnectors },
      info,
    ) => {
      let result;

      // let curator = await context.connectors.Curator.findOneById(id);
      result = undefined;
      // place your custom code here

      return result;
    },
  },
});
