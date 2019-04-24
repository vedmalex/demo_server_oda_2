import { Query, logger, RegisterConnectors } from '../../../../common';
import gql from 'graphql-tag';

export default new Query({
  schema: gql`
    extend type RootQuery {
      courseItems(
        after: String
        first: Int
        before: String
        last: Int
        limit: Int
        skip: Int
        orderBy: [CourseSortOrder]
        filter: CourseComplexFilter
      ): [Course]
    }
  `,
  resolver: async (
    owner,
    args: {
      after: string;
      first: number;
      before: string;
      last: number;
      limit: number;
      skip: number;
      orderBy: string | string[];
      filter: object;
    },
    context: { connectors: RegisterConnectors },
    info,
  ) => {
    logger.trace('courses');
    let idMap = {
      id: '_id',
      createdBy: 'createdBy',
      updateBy: 'updateBy',
    };
    return await context.connectors.Course.getList({
      ...args,
      idMap,
    });
  },
});
