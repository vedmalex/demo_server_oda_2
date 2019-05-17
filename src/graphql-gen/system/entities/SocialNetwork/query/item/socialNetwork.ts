import { Query, logger, RegisterConnectors } from '../../../../common';
import gql from 'graphql-tag';

export default new Query({
  schema: gql`
    extend type Query {
      socialNetwork(id: ID, account: String): SocialNetwork
    }
  `,
  resolver: async (
    owner,
    args: {
      id?: string;
      account?: string;
    },
    context: { connectors: RegisterConnectors },
    info,
  ) => {
    logger.trace('socialNetwork');
    let result;
    if (args.id) {
      result = await context.connectors.SocialNetwork.findOneById(args.id);
    } else if (args.account) {
      result = await context.connectors.SocialNetwork.findOneByAccount(
        args.account,
      );
    }
    return result;
  },
});
