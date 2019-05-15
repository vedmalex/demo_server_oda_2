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

import { PartialSubjectCourse } from '../../../data/SubjectCourse/types/model';

export default new Type({
  schema: gql`
    type Subject {
      # # Name
      name: String!
      # # Id
      id: ID!
      # # Course

      course(
        after: String
        first: Int
        before: String
        last: Int
        limit: Int
        skip: Int
        orderBy: [CourseSortOrder]
        filter: CourseComplexFilter
      ): SubjectBelongsToManyCoursesConnection
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
      logger.trace('Subject.course');
      let result;
      let selectionSet = traverse(info);

      let subject = await context.connectors.Subject.findOneById(id);
      //BelongsToMany

      if (subject && subject.id) {
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
          subject: {
            eq: subject.id,
          },
        };
        let idMap = {
          id: '_id',
        };

        const itemCheck = Filter.Process.create(args.filter || {}, idMap);

        let links = await context.connectors.SubjectCourse.getList(
          _args,

          async link => {
            let result = await context.connectors.Course.findOneById(
              link.course,
            );
            if (result) {
              return itemCheck({
                ...result,
                hours: link.hours,
                level: link.level,
              });
            } else {
              // inconsistent link
              if (!result) {
                logger.warn(
                  'Possibly inconsistent link connection for Subject.course with id %s',
                  id,
                );
              }
              return false;
            }
          },
        );
        if (links.length > 0) {
          let linksHash = links.reduce((res, cur) => {
            res[cur.course] = cur;
            return res;
          }, {}) as { [id: string]: PartialSubjectCourse };

          let res = await context.connectors.Course.getList({
            filter: {
              ...args.filter,
              id: { in: links.map(i => i.course) },
            },
          });

          if (res.length > 0) {
            let edges = res.map(r => ({
              hours: linksHash[r.id].hours,
              level: linksHash[r.id].level,
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
                    ? await context.connectors.Course.getCount({
                        filter: {
                          id: { in: links.map(i => i.course) },
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
