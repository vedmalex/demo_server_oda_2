import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  ensureUser,
  unlinkMeetingFromCreatedBy,
  linkMeetingToCreatedBy,
  unlinkMeetingFromUpdateBy,
  linkMeetingToUpdateBy,
} from '../../../../common';
import gql from 'graphql-tag';
import { merge } from 'lodash';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      updateMeeting(input: updateMeetingInput!): updateMeetingPayload
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
        createdByUnlink?: object /*User*/;
        createdByCreate?: object /*User*/;
        updateBy?: object /*User*/;
        updateByUnlink?: object /*User*/;
        updateByCreate?: object /*User*/;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('updateMeeting');
      let payload = context.connectors.Meeting.getPayload(args);

      let result;
      let previous;

      if (args.id) {
        previous = await context.connectors.Meeting.findOneById(args.id);
        result = await context.connectors.Meeting.findOneByIdAndUpdate(
          args.id,
          merge({}, previous, payload),
        );
      }

      if (!result) {
        throw new Error('item of type Meeting is not found for update');
      }

      if (context.pubsub) {
        context.pubsub.publish('Meeting', {
          Meeting: {
            mutation: 'UPDATE',
            node: result,
            previous,
            updatedFields: Object.keys(payload).filter(
              f => payload[f] !== undefined,
            ),
            payload: args,
          },
        });
      }

      if (args.createdByUnlink) {
        let $item = args.createdByUnlink;
        if ($item) {
          let createdBy = await ensureUser({
            args: $item,
            context,
            create: false,
          });
          await unlinkMeetingFromCreatedBy({
            context,
            createdBy,
            meeting: result,
          });
        }
      }

      if (args.createdByCreate) {
        let $item = args.createdByCreate as { id };
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

      if (args.createdBy) {
        let $item = args.createdBy as { id };
        if ($item) {
          let createdBy = await ensureUser({
            args: $item,
            context,
            create: false,
          });

          await linkMeetingToCreatedBy({
            context,
            createdBy,
            meeting: result,
          });
        }
      }

      if (args.updateByUnlink) {
        let $item = args.updateByUnlink;
        if ($item) {
          let updateBy = await ensureUser({
            args: $item,
            context,
            create: false,
          });
          await unlinkMeetingFromUpdateBy({
            context,
            updateBy,
            meeting: result,
          });
        }
      }

      if (args.updateByCreate) {
        let $item = args.updateByCreate as { id };
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

      if (args.updateBy) {
        let $item = args.updateBy as { id };
        if ($item) {
          let updateBy = await ensureUser({
            args: $item,
            context,
            create: false,
          });

          await linkMeetingToUpdateBy({
            context,
            updateBy,
            meeting: result,
          });
        }
      }

      return {
        meeting: result,
      };
    },
  ),
});
