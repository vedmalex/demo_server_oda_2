import { Query, logger, RegisterConnectors } from '../../../../common';
import gql from 'graphql-tag';

export default new Query({
  schema: gql`
    extend type RootQuery {
      student(id: ID): Student
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
    logger.trace('student');
    let result;
    if (args.id) {
      result = await context.connectors.Student.findOneById(args.id);
    }
    return result;
  },
});
