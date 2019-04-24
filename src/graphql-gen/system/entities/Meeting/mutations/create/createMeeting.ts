import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  ensureUser,
  linkMeetingToCreatedBy,
  linkMeetingToUpdateBy,
} from '../../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      createMeeting(input: createMeetingInput!): createMeetingPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        createdAt?: Date;
        updatedAt?: Date;
        removed?: boolean;
        owner?: string;
        createdBy?: object /*User*/;
        updateBy?: object /*User*/;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('createMeeting');
      let create = context.connectors.Meeting.getPayload(args, false);

      let result = await context.connectors.Meeting.create(create);

      if (context.pubsub) {
        context.pubsub.publish('Meeting', {
          Meeting: {
            mutation: 'CREATE',
            node: result,
            previous: null,
            updatedFields: [],
            payload: args,
          },
        });
      }

      let meetingEdge = {
        cursor: result.id,
        node: result,
      };

      if (args.createdBy) {
        let $item = args.createdBy as { id };
        if ($item) {
          let createdBy = await ensureUser({
            args: $item,
            context,
            create: true,
          });
          await linkMeetingToCreatedBy({
            context,
            createdBy,
            meeting: result,
          });
        }
      }

      if (args.updateBy) {
        let $item = args.updateBy as { id };
        if ($item) {
          let updateBy = await ensureUser({
            args: $item,
            context,
            create: true,
          });
          await linkMeetingToUpdateBy({
            context,
            updateBy,
            meeting: result,
          });
        }
      }

      return {
        meeting: meetingEdge,
      };
    },
  ),
});
