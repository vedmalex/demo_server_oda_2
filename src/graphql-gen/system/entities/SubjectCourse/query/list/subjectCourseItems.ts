import { Query, logger, RegisterConnectors } from '../../../../common';
import gql from 'graphql-tag';

export default new Query({
  schema: gql`
    extend type Query {
      subjectCourseItems(
        after: String
        first: Int
        before: String
        last: Int
        limit: Int
        skip: Int
        orderBy: [SubjectCourseSortOrder]
        filter: SubjectCourseComplexFilter
      ): [SubjectCourse]
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
    logger.trace('subjectCourses');
    let idMap = {
      id: '_id',
      subjectLink: 'subjectLink',
      courseLink: 'courseLink',
    };
    return await context.connectors.SubjectCourse.getList({
      ...args,
      idMap,
    });
  },
});
