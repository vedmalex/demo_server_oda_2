import { Query, logger, RegisterConnectors } from '../../../../common';
import gql from 'graphql-tag';

export default new Query({
  schema: gql`
    extend type RootQuery {
      user(id: ID): User
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
    logger.trace('user');
    let result;
    if (args.id) {
      result = await context.connectors.User.findOneById(args.id);
    }
    return result;
  },
});
