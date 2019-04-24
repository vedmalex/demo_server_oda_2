import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
} from '../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      removeFromMeetingBelongsToGroup(
        input: removeFromMeetingBelongsToGroupInput
      ): removeFromMeetingBelongsToGroupPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        meeting?: string;
        group?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('removeFromMeetingBelongsToGroup');
      let meeting = args.meeting;
      let group = args.group;
      let payload = {
        meeting,
        group,
      };
      await context.connectors.Meeting.removeFromGroup(payload);

      let source = await context.connectors.Meeting.findOneById(meeting);

      if (context.pubsub) {
        context.pubsub.publish('Meeting', {
          Meeting: {
            mutation: 'UNLINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                meeting: args.meeting,
                group: args.group,
              },
              relation: 'group',
            },
          },
        });
      }

      return {
        meeting: source,
      };
    },
  ),
});
