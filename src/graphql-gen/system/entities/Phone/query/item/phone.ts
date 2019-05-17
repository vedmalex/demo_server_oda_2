import { Query, logger, RegisterConnectors } from '../../../../common';
import gql from 'graphql-tag';

export default new Query({
  schema: gql`
    extend type Query {
      phone(id: ID, phoneNumber: String): Phone
    }
  `,
  resolver: async (
    owner,
    args: {
      id?: string;
      phoneNumber?: string;
    },
    context: { connectors: RegisterConnectors },
    info,
  ) => {
    logger.trace('phone');
    let result;
    if (args.id) {
      result = await context.connectors.Phone.findOneById(args.id);
    } else if (args.phoneNumber) {
      result = await context.connectors.Phone.findOneByPhoneNumber(
        args.phoneNumber,
      );
    }
    return result;
  },
});
