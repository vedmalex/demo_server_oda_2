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
      addToMeetingBelongsToUpdateBy(
        input: addToMeetingBelongsToUpdateByInput
      ): addToMeetingBelongsToUpdateByPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        meeting?: string;
        user?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('addToMeetingBelongsToUpdateBy');
      let meeting = args.meeting;
      let user = args.user;
      let payload = {
        meeting,
        user,
      };

      await context.connectors.Meeting.addToUpdateBy(payload);

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
                user: args.user,
              },
              relation: 'updateBy',
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
