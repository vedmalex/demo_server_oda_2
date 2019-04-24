import { Query, logger, RegisterConnectors } from '../../../../common';
import gql from 'graphql-tag';

export default new Query({
  schema: gql`
    extend type RootQuery {
      user(id: ID, userName: String): User
    }
  `,
  resolver: async (
    owner,
    args: {
      id?: string;
      userName?: string;
    },
    context: { connectors: RegisterConnectors },
    info,
  ) => {
    logger.trace('user');
    let result;
    if (args.id) {
      result = await context.connectors.User.findOneById(args.id);
    } else if (args.userName) {
      result = await context.connectors.User.findOneByUserName(args.userName);
    }
    return result;
  },
});
