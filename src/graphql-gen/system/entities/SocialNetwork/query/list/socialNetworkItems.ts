import { Query, logger, RegisterConnectors } from '../../../../common';
import gql from 'graphql-tag';

export default new Query({
  schema: gql`
    extend type RootQuery {
      socialNetworkItems(
        after: String
        first: Int
        before: String
        last: Int
        limit: Int
        skip: Int
        orderBy: [SocialNetworkSortOrder]
        filter: SocialNetworkComplexFilter
      ): [SocialNetwork]
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
    logger.trace('socialNetworks');
    let idMap = {
      id: '_id',
      createdBy: 'createdBy',
      updateBy: 'updateBy',
    };
    return await context.connectors.SocialNetwork.getList({
      ...args,
      idMap,
    });
  },
});
