import gql from 'graphql-tag';
import { Schema } from '../../../../common';

import { logger, mutateSafe } from '../../../../common';

export default new Schema({
  name: 'Meeting.mutation.create.safe',
  schema: gql`
    extend type Mutation {
      createManyMeetingSafe(
        input: [createManyMeetingInput!]
      ): [createManyMeetingPayload]
      createMeetingSafe(input: createMeetingInput!): createMeetingPayload
    }
  `,
  resolver: {
    Mutation: {
      createManyMeetingSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('createManyMeetingSafe');
          return context.resolvers.Mutation.createManyMeeting(
            root,
            args,
            context,
            info,
          );
        },
      ),
      createMeetingSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('createMeetingSafe');
          return context.resolvers.Mutation.createMeeting(
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
