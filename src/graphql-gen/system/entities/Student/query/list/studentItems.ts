import { Query, logger, RegisterConnectors } from '../../../../common';
import gql from 'graphql-tag';

export default new Query({
  schema: gql`
    extend type Query {
      studentItems(
        after: String
        first: Int
        before: String
        last: Int
        limit: Int
        skip: Int
        orderBy: [StudentSortOrder]
        filter: StudentComplexFilter
      ): [Student]
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
    logger.trace('students');
    let idMap = {
      id: '_id',
      person: 'person',
      group: 'group',
    };
    return await context.connectors.Student.getList({
      ...args,
      idMap,
    });
  },
});
