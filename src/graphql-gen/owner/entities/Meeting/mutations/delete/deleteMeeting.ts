import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  unlinkMeetingFromAll,
} from '../../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      deleteMeeting(input: deleteMeetingInput!): deleteMeetingPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
      },
      context: {
        connectors: RegisterConnectors;
        pubsub: PubSubEngine;
        userGQL: (args: any) => Promise<any>;
      },
      info,
    ) => {
      logger.trace('deleteMeeting');
      let result;
      if (args.id) {
        await unlinkMeetingFromAll(
          [
            {
              key: 'id',
              type: 'ID',
              value: args.id,
            },
          ],
          context,
        );

        result = await context.connectors.Meeting.findOneByIdAndRemove(args.id);
      }

      if (!result) {
        throw new Error('item of type Meeting is not found for delete');
      }

      if (context.pubsub) {
        context.pubsub.publish('Meeting', {
          Meeting: {
            mutation: 'DELETE',
            node: result,
            previous: null,
            updatedFields: [],
            payload: args,
          },
        });
      }

      return {
        deletedItemId: result.id,
        meeting: result,
      };
    },
  ),
});
