import * as _ from 'lodash';
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
    type Group {
      # # Name
      name: String!
      # # Id
      id: ID!
      # # Course

      course: Course

      # # Students

      students(
        after: String
        first: Int
        before: String
        last: Int
        limit: Int
        skip: Int
        orderBy: [StudentSortOrder]
        filter: StudentComplexFilter
      ): GroupHasManyStudentsConnection
      # # Curator

      curator: Curator
    }
  `,
  resolver: {
    id: ({ id }) => id,

    course: async (
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

      let group = await context.connectors.Group.findOneById(id);
      //BelongsTo
      if (group && group.course) {
        result = await context.connectors.Course.findOneById(group.course);
      }

      return result;
    },
    students: async (
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

      let group = await context.connectors.Group.findOneById(id);
      //HasMany
      let idMap = {
        id: '_id',
        person: 'person',
        group: 'group',
      };
      if (group && group.id) {
        if (!args.filter) {
          args.filter = {};
        }
        args.filter.group = {
          eq: group.id,
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
    curator: async (
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

      let group = await context.connectors.Group.findOneById(id);
      //BelongsTo
      if (group && group.curator) {
        result = await context.connectors.Curator.findOneById(group.curator);
      }

      return result;
    },
  },
});
