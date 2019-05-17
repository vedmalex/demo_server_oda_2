import { Query, logger, RegisterConnectors } from '../../../../common';
import gql from 'graphql-tag';

export default new Query({
  schema: gql`
    extend type Query {
      person(id: ID, spiritualName: String, fullName: String): Person
    }
  `,
  resolver: async (
    owner,
    args: {
      id?: string;
      spiritualName?: string;
      fullName?: string;
    },
    context: { connectors: RegisterConnectors },
    info,
  ) => {
    logger.trace('person');
    let result;
    if (args.id) {
      result = await context.connectors.Person.findOneById(args.id);
    } else if (args.spiritualName) {
      result = await context.connectors.Person.findOneBySpiritualName(
        args.spiritualName,
      );
    } else if (args.fullName) {
      result = await context.connectors.Person.findOneByFullName(args.fullName);
    }
    return result;
  },
});
