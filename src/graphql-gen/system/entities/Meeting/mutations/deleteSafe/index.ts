import gql from 'graphql-tag';
import { Schema } from '../../../../common';

import { logger, mutateSafe } from '../../../../common';

export default new Schema({
  name: 'Meeting.mutation.delete.safe',
  schema: gql`
    extend type Mutation {
      deleteManyMeetingSafe(
        input: [deleteManyMeetingInput!]
      ): [deleteManyMeetingPayload]
      deleteMeetingSafe(input: deleteMeetingInput!): deleteMeetingPayload
    }
  `,
  resolver: {
    Mutation: {
      deleteManyMeetingSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('deleteManyMeetingSafe');
          return context.resolvers.Mutation.deleteManyMeeting(
            root,
            args,
            context,
            info,
          );
        },
      ),
      deleteMeetingSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('deleteMeetingSafe');
          return context.resolvers.Mutation.deleteMeeting(
            root,
            args,
            context,
            info,
          );
        },
      ),
    },
  },
});
