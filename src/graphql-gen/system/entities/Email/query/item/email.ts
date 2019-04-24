import { Query, logger, RegisterConnectors } from '../../../../common';
import gql from 'graphql-tag';

export default new Query({
  schema: gql`
    extend type RootQuery {
      email(id: ID): Email
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
    logger.trace('email');
    let result;
    if (args.id) {
      result = await context.connectors.Email.findOneById(args.id);
    }
    return result;
  },
});
