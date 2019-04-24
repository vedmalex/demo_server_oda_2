import { Query, logger, RegisterConnectors } from '../../../../common';
import gql from 'graphql-tag';

export default new Query({
  schema: gql`
    extend type RootQuery {
      group(id: ID): Group
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
    logger.trace('group');
    let result;
    if (args.id) {
      result = await context.connectors.Group.findOneById(args.id);
    }
    return result;
  },
});
