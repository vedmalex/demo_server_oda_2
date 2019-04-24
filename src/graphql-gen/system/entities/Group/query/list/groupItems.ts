import { Query, logger, RegisterConnectors } from '../../../../common';
import gql from 'graphql-tag';

export default new Query({
  schema: gql`
    extend type RootQuery {
      groupItems(
        after: String
        first: Int
        before: String
        last: Int
        limit: Int
        skip: Int
        orderBy: [GroupSortOrder]
        filter: GroupComplexFilter
      ): [Group]
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
    logger.trace('groups');
    let idMap = {
      id: '_id',
      course: 'course',
      curator: 'curator',
    };
    return await context.connectors.Group.getList({
      ...args,
      idMap,
    });
  },
});
