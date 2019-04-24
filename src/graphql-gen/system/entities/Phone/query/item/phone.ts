import { Query, logger, RegisterConnectors } from '../../../../common';
import gql from 'graphql-tag';

export default new Query({
  schema: gql`
    extend type RootQuery {
      phone(id: ID): Phone
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
    logger.trace('phone');
    let result;
    if (args.id) {
      result = await context.connectors.Phone.findOneById(args.id);
    }
    return result;
  },
});
