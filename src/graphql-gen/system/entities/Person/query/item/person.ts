import { Query, logger, RegisterConnectors } from '../../../../common';
import gql from 'graphql-tag';

export default new Query({
  schema: gql`
    extend type RootQuery {
      person(id: ID): Person
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
    logger.trace('person');
    let result;
    if (args.id) {
      result = await context.connectors.Person.findOneById(args.id);
    }
    return result;
  },
});
