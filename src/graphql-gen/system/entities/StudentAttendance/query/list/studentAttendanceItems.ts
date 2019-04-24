import { Query, logger, RegisterConnectors } from '../../../../common';
import gql from 'graphql-tag';

export default new Query({
  schema: gql`
    extend type RootQuery {
      studentAttendanceItems(
        after: String
        first: Int
        before: String
        last: Int
        limit: Int
        skip: Int
        orderBy: [StudentAttendanceSortOrder]
        filter: StudentAttendanceComplexFilter
      ): [StudentAttendance]
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
    logger.trace('studentAttendances');
    let idMap = {
      id: '_id',
      meetingLink: 'meetingLink',
      studentLink: 'studentLink',
    };
    return await context.connectors.StudentAttendance.getList({
      ...args,
      idMap,
    });
  },
});
