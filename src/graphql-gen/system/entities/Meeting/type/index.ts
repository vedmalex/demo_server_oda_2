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
    type Meeting {
      # # Date
      date: Date
      # # Id
      id: ID!
      # # Curator

      curator: Curator

      # # Group

      group: Group

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
      ): MeetingBelongsToManyStudentsConnection
    }
  `,
  resolver: {
    id: ({ id }) => id,

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

      let meeting = await context.connectors.Meeting.findOneById(id);
      //BelongsTo
      if (meeting && meeting.curator) {
        result = await context.connectors.Curator.findOneById(meeting.curator);
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

      let meeting = await context.connectors.Meeting.findOneById(id);
      //BelongsTo
      if (meeting && meeting.group) {
        result = await context.connectors.Group.findOneById(meeting.group);
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

      let meeting = await context.connectors.Meeting.findOneById(id);
      //BelongsToMany

      if (meeting && meeting.id) {
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
          meeting: {
            eq: meeting.id,
          },
        };
        let idMap = {
          id: '_id',
          person: 'person',
          group: 'group',
        };

        const itemCheck = Filter.Process.create(args.filter || {}, idMap);

        let links = await context.connectors.StudentAttendance.getList(
          _args,

          async link => {
            let result = await context.connectors.Student.findOneById(
              link.student,
            );
            if (result) {
              return itemCheck({
                ...result,
                present: link.present,
                specialNotes: link.specialNotes,
                superpuper: link.superpuper,
              });
            } else {
              return false;
            }
          },
        );
        if (links.length > 0) {
          let linksHash = links.reduce((res, cur) => {
            res[cur.student] = cur;
            return res;
          }, {}) as { [id: string]: PartialStudentAttendance };

          let res = await context.connectors.Student.getList({
            filter: {
              ...args.filter,
              id: { in: links.map(i => i.student) },
            },
          });

          if (res.length > 0) {
            let edges = res.map(r => ({
              present: linksHash[r.id].present,
              specialNotes: linksHash[r.id].specialNotes,
              superpuper: linksHash[r.id].superpuper,
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
                    ? await context.connectors.Student.getCount({
                        filter: {
                          id: { in: links.map(i => i.student) },
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
