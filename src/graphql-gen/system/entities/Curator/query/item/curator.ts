import { Query, logger, RegisterConnectors } from '../../../../common';
import gql from 'graphql-tag';

export default new Query({
  schema: gql`
    extend type RootQuery {
      curator(id: ID): Curator
    }
  `,
  resolver: async (
    owner,
    args: {
      id?: string;
    },
    context: { connectors: RegisterConnectors },
    info,
  ) => {
    logger.trace('curator');
    let result;
    if (args.id) {
      result = await context.connectors.Curator.findOneById(args.id);
    }
    return result;
  },
});
