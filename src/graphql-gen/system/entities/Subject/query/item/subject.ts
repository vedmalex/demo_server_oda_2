import { Query, logger, RegisterConnectors } from '../../../../common';
import gql from 'graphql-tag';

export default new Query({
  schema: gql`
    extend type RootQuery {
      subject(id: ID): Subject
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
    logger.trace('subject');
    let result;
    if (args.id) {
      result = await context.connectors.Subject.findOneById(args.id);
    }
    return result;
  },
});
