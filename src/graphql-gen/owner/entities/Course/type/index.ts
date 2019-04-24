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

import { PartialSubjectCourse } from '../../../data/SubjectCourse/types/model';

export default new Type({
  schema: gql`
    type Course {
      # # Name
      name: String!
      # # Id
      id: ID!
      # # Subjects

      subjects(
        after: String
        first: Int
        before: String
        last: Int
        limit: Int
        skip: Int
        orderBy: [SubjectSortOrder]
        filter: SubjectComplexFilter
      ): CourseBelongsToManySubjectsConnection
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
      ): CourseHasManyGroupsConnection
    }
  `,
  resolver: {
    id: ({ id }) => id,

    subjects: async (
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

      let course = await context.connectors.Course.findOneById(id);
      //BelongsToMany

      if (course && course.id) {
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
          course: {
            eq: course.id,
          },
        };
        let idMap = {
          id: '_id',
        };

        let links = await context.connectors.SubjectCourse.getList(_args);
        if (links.length > 0) {
          let linksHash = links.reduce((res, cur) => {
            res[cur.subject] = cur;
            return res;
          }, {}) as { [id: string]: PartialSubjectCourse };

          let res = await context.connectors.Subject.getList({
            filter: {
              ...args.filter,
              id: { in: links.map(i => i.subject) },
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
                    ? await context.connectors.Subject.getCount({
                        filter: {
                          id: { in: links.map(i => i.subject) },
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

      let course = await context.connectors.Course.findOneById(id);
      //HasMany
      let idMap = {
        id: '_id',
        course: 'course',
        curator: 'curator',
      };
      if (course && course.id) {
        if (!args.filter) {
          args.filter = {};
        }
        args.filter.course = {
          eq: course.id,
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
  },
});
