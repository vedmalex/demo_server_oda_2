import { Query, logger, RegisterConnectors } from '../../../../common';
import gql from 'graphql-tag';

export default new Query({
  schema: gql`
    extend type RootQuery {
      meetingItems(
        after: String
        first: Int
        before: String
        last: Int
        limit: Int
        skip: Int
        orderBy: [MeetingSortOrder]
        filter: MeetingComplexFilter
      ): [Meeting]
    }
  `,
  resolver: async (
    owner,
    args: {
      after: string;
      first: number;
      before: string;
      last: number;
      limit: number;
      skip: number;
      orderBy: string | string[];
      filter: object;
    },
    context: { connectors: RegisterConnectors },
    info,
  ) => {
    logger.trace('meetings');
    let idMap = {
      id: '_id',
      curator: 'curator',
      group: 'group',
    };
    return await context.connectors.Meeting.getList({
      ...args,
      idMap,
    });
  },
});
