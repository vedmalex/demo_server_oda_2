import { Query, logger, RegisterConnectors } from '../../../../common';
import gql from 'graphql-tag';

export default new Query({
  schema: gql`
    extend type RootQuery {
      emailItems(
        after: String
        first: Int
        before: String
        last: Int
        limit: Int
        skip: Int
        orderBy: [EmailSortOrder]
        filter: EmailComplexFilter
      ): [Email]
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
    logger.trace('emails');
    let idMap = {
      id: '_id',
      person: 'person',
    };
    return await context.connectors.Email.getList({
      ...args,
      idMap,
    });
  },
});
