import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  ensureUser,
  unlinkCuratorFromCreatedBy,
  linkCuratorToCreatedBy,
  unlinkCuratorFromUpdateBy,
  linkCuratorToUpdateBy,
} from '../../../../common';
import gql from 'graphql-tag';
import { merge } from 'lodash';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      updateCurator(input: updateCuratorInput!): updateCuratorPayload
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
      logger.trace('updateCurator');
      let payload = context.connectors.Curator.getPayload(args);

      let result;
      let previous;

      if (args.id) {
        previous = await context.connectors.Curator.findOneById(args.id);
        result = await context.connectors.Curator.findOneByIdAndUpdate(
          args.id,
          merge({}, previous, payload),
        );
      }

      if (!result) {
        throw new Error('item of type Curator is not found for update');
      }

      if (context.pubsub) {
        context.pubsub.publish('Curator', {
          Curator: {
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
          await unlinkCuratorFromCreatedBy({
            context,
            createdBy,
            curator: result,
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

          await linkCuratorToCreatedBy({
            context,
            createdBy,
            curator: result,
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

          await linkCuratorToCreatedBy({
            context,
            createdBy,
            curator: result,
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
          await unlinkCuratorFromUpdateBy({
            context,
            updateBy,
            curator: result,
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

          await linkCuratorToUpdateBy({
            context,
            updateBy,
            curator: result,
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

          await linkCuratorToUpdateBy({
            context,
            updateBy,
            curator: result,
          });
        }
      }

      return {
        curator: result,
      };
    },
  ),
});
