import { Query, logger, RegisterConnectors } from '../../../../common';
import gql from 'graphql-tag';

export default new Query({
  schema: gql`
    extend type RootQuery {
      course(id: ID, name: String): Course
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
    logger.trace('course');
    let result;
    if (args.id) {
      result = await context.connectors.Course.findOneById(args.id);
    } else if (args.name) {
      result = await context.connectors.Course.findOneByName(args.name);
    }
    return result;
  },
});
