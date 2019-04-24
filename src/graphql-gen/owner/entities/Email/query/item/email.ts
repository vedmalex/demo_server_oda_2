import { Query, logger, RegisterConnectors } from '../../../../common';
import gql from 'graphql-tag';

export default new Query({
  schema: gql`
    extend type RootQuery {
      email(id: ID, email: String): Email
    }
  `,
  resolver: async (
    owner,
    args: {
      id?: string;
      email?: string;
    },
    context: { connectors: RegisterConnectors },
    info,
  ) => {
    logger.trace('email');
    let result;
    if (args.id) {
      result = await context.connectors.Email.findOneById(args.id);
    } else if (args.email) {
      result = await context.connectors.Email.findOneByEmail(args.email);
    }
    return result;
  },
});
