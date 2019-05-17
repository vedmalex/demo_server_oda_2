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
    extend type Mutation {
      removeFromMeetingBelongsToCurator(
        input: removeFromMeetingBelongsToCuratorInput
      ): removeFromMeetingBelongsToCuratorPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        meeting?: string;
        curator?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('removeFromMeetingBelongsToCurator');
      let meeting = args.meeting;
      let curator = args.curator;
      let payload = {
        meeting,
        curator,
      };
      await context.connectors.Meeting.removeFromCurator(payload);

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
                curator: args.curator,
              },
              relation: 'curator',
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
