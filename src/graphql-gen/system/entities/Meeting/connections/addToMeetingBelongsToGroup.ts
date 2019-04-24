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
      addToMeetingBelongsToGroup(
        input: addToMeetingBelongsToGroupInput
      ): addToMeetingBelongsToGroupPayload
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
      logger.trace('addToMeetingBelongsToGroup');
      let meeting = args.meeting;
      let group = args.group;
      let payload = {
        meeting,
        group,
      };

      await context.connectors.Meeting.addToGroup(payload);

      let source = await context.connectors.Meeting.findOneById(meeting);

      if (context.pubsub) {
        context.pubsub.publish('Meeting', {
          Meeting: {
            mutation: 'LINK',
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
