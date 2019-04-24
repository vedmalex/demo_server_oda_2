import { Query, logger, RegisterConnectors } from '../../../../common';
import gql from 'graphql-tag';

export default new Query({
  schema: gql`
    extend type RootQuery {
      socialNetwork(id: ID): SocialNetwork
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
    logger.trace('socialNetwork');
    let result;
    if (args.id) {
      result = await context.connectors.SocialNetwork.findOneById(args.id);
    }
    return result;
  },
});
