import gql from 'graphql-tag';
import { Schema } from '../../../../common';

import { logger, mutateSafe } from '../../../../common';

export default new Schema({
  name: 'Meeting.mutation.update.safe',
  schema: gql`
    extend type Mutation {
      updateManyMeetingSafe(
        input: [updateManyMeetingInput!]
      ): [updateManyMeetingPayload]
      updateMeetingSafe(input: updateMeetingInput!): updateMeetingPayload
    }
  `,
  resolver: {
    Mutation: {
      updateManyMeetingSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('updateManyMeetingSafe');
          return context.resolvers.Mutation.updateManyMeeting(
            root,
            args,
            context,
            info,
          );
        },
      ),
      updateMeetingSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('updateMeetingSafe');
          return context.resolvers.Mutation.updateMeeting(
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
