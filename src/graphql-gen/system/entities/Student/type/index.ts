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

import { PartialStudentAttendance } from '../../../data/StudentAttendance/types/model';

export default new Type({
  schema: gql`
    type Student {
      # # Id
      id: ID!
      # # Person

      person: Person

      # # Group

      group: Group

      # # Meetings

      meetings(
        after: String
        first: Int
        before: String
        last: Int
        limit: Int
        skip: Int
        orderBy: [MeetingSortOrder]
        filter: MeetingComplexFilter
      ): StudentBelongsToManyMeetingsConnection
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

      let student = await context.connectors.Student.findOneById(id);
      //BelongsTo
      if (student && student.person) {
        result = await context.connectors.Person.findOneById(student.person);
      }

      return result;
    },
    group: async (
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

      let student = await context.connectors.Student.findOneById(id);
      //BelongsTo
      if (student && student.group) {
        result = await context.connectors.Group.findOneById(student.group);
      }

      return result;
    },
    meetings: async (
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

      let student = await context.connectors.Student.findOneById(id);
      //BelongsToMany

      if (student && student.id) {
        const cursor = pagination(args);
        let direction = detectCursorDirection(args)._id;
        const _args = {
          ..._.pick(args, [
            'limit',
            'skip',
            'first',
            'after',
            'last',
            'before',
          ]),
        } as {
          limit?: number;
          skip?: number;
          first?: number;
          after?: string;
          last?: number;
          before?: string;
          filter?: {
            [k: string]: any;
          };
        };

        _args.filter = {
          student: {
            eq: student.id,
          },
        };
        let idMap = {
          id: '_id',
          curator: 'curator',
          group: 'group',
        };

        let links = await context.connectors.StudentAttendance.getList(_args);
        if (links.length > 0) {
          let linksHash = links.reduce((res, cur) => {
            res[cur.meeting] = cur;
            return res;
          }, {}) as { [id: string]: PartialStudentAttendance };

          let res = await context.connectors.Meeting.getList({
            filter: {
              ...args.filter,
              id: { in: links.map(i => i.meeting) },
            },
          });

          if (res.length > 0) {
            let edges = res.map(r => ({
              cursor: linksHash[r.id].id,
              node: r,
            }));

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
                      ? edges.length === cursor.limit
                      : false
                    : undefined,
                  hasNextPage: get(selectionSet, 'pageInfo.hasNextPage')
                    ? direction === consts.DIRECTION.FORWARD
                      ? edges.length === cursor.limit
                      : false
                    : undefined,
                  count: get(selectionSet, 'pageInfo.count')
                    ? await context.connectors.Meeting.getCount({
                        filter: {
                          id: { in: links.map(i => i.meeting) },
                        },
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
        } else {
          result = emptyConnection();
        }
      }

      return result;
    },
  },
});
