import { Query, logger, RegisterConnectors } from '../../../../common';
import gql from 'graphql-tag';

export default new Query({
  schema: gql`
    extend type RootQuery {
      subject(id: ID, name: String): Subject
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
    logger.trace('subject');
    let result;
    if (args.id) {
      result = await context.connectors.Subject.findOneById(args.id);
    } else if (args.name) {
      result = await context.connectors.Subject.findOneByName(args.name);
    }
    return result;
  },
});
