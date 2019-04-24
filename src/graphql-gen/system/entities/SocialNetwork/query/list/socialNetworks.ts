import {
  Query,
  logger,
  RegisterConnectors,
  get,
  traverse,
  pagination,
  detectCursorDirection,
  fixCount,
  consts,
  emptyConnection,
} from '../../../../common';
import gql from 'graphql-tag';

export default new Query({
  schema: gql`
    extend type RootQuery {
      socialNetworks(
        after: String
        first: Int
        before: String
        last: Int
        limit: Int
        skip: Int
        orderBy: [SocialNetworkSortOrder]
        filter: SocialNetworkComplexFilter
      ): SocialNetworksConnection
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
    let result;
    let selectionSet = traverse(info);

    let idMap = {
      id: '_id',
      person: 'person',
    };

    let list = get(selectionSet, 'edges.node')
      ? await context.connectors.SocialNetwork.getList({
          ...args,
          idMap,
        })
      : [];

    if (list.length > 0) {
      let cursor = pagination(args);
      let direction = detectCursorDirection(args)._id;

      let edges = get(selectionSet, 'edges')
        ? list.map(l => {
            return {
              cursor: l.id,
              node: l,
            };
          })
        : null;

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
              ? await fixCount(list.length, cursor, () =>
                  context.connectors.SocialNetwork.getCount({
                    ...args,
                    idMap,
                  }),
                )
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
    return result;
  },
});
