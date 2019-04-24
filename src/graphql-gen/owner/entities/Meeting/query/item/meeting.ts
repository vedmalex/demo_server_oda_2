import { Query, logger, RegisterConnectors } from '../../../../common';
import gql from 'graphql-tag';

export default new Query({
  schema: gql`
    extend type RootQuery {
      meeting(id: ID): Meeting
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
    logger.trace('meeting');
    let result;
    if (args.id) {
      result = await context.connectors.Meeting.findOneById(args.id);
    }
    return result;
  },
});
