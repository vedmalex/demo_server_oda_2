import { Query, logger, RegisterConnectors } from '../../../../common';
import gql from 'graphql-tag';

export default new Query({
  schema: gql`
    extend type Query {
      group(id: ID, name: String): Group
    }
  `,
  resolver: async (
    owner,
    args: {
      id?: string;
      name?: string;
    },
    context: { connectors: RegisterConnectors },
    info,
  ) => {
    logger.trace('group');
    let result;
    if (args.id) {
      result = await context.connectors.Group.findOneById(args.id);
    } else if (args.name) {
      result = await context.connectors.Group.findOneByName(args.name);
    }
    return result;
  },
});
