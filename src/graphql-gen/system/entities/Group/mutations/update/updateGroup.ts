import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  ensureUser,
  unlinkGroupFromCreatedBy,
  linkGroupToCreatedBy,
  unlinkGroupFromUpdateBy,
  linkGroupToUpdateBy,
} from '../../../../common';
import gql from 'graphql-tag';
import { merge } from 'lodash';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      updateGroup(input: updateGroupInput!): updateGroupPayload
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
      logger.trace('updateGroup');
      let payload = context.connectors.Group.getPayload(args);

      let result;
      let previous;

      if (args.id) {
        previous = await context.connectors.Group.findOneById(args.id);
        result = await context.connectors.Group.findOneByIdAndUpdate(
          args.id,
          merge({}, previous, payload),
        );
      }

      if (!result) {
        throw new Error('item of type Group is not found for update');
      }

      if (context.pubsub) {
        context.pubsub.publish('Group', {
          Group: {
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
          await unlinkGroupFromCreatedBy({
            context,
            createdBy,
            group: result,
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

          await linkGroupToCreatedBy({
            context,
            createdBy,
            group: result,
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

          await linkGroupToCreatedBy({
            context,
            createdBy,
            group: result,
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
          await unlinkGroupFromUpdateBy({
            context,
            updateBy,
            group: result,
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

          await linkGroupToUpdateBy({
            context,
            updateBy,
            group: result,
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

          await linkGroupToUpdateBy({
            context,
            updateBy,
            group: result,
          });
        }
      }

      return {
        group: result,
      };
    },
  ),
});
