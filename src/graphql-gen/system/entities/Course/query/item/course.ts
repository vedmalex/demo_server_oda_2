import { Query, logger, RegisterConnectors } from '../../../../common';
import gql from 'graphql-tag';

export default new Query({
  schema: gql`
    extend type RootQuery {
      course(id: ID): Course
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
    logger.trace('course');
    let result;
    if (args.id) {
      result = await context.connectors.Course.findOneById(args.id);
    }
    return result;
  },
});
