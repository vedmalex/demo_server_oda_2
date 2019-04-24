import { Query, logger, RegisterConnectors } from '../../../../common';
import gql from 'graphql-tag';

export default new Query({
  schema: gql`
    extend type RootQuery {
      studentAttendance(id: ID): StudentAttendance
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
    logger.trace('studentAttendance');
    let result;
    if (args.id) {
      result = await context.connectors.StudentAttendance.findOneById(args.id);
    }
    return result;
  },
});
