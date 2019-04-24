import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  ensureUser,
  unlinkSocialNetworkFromCreatedBy,
  linkSocialNetworkToCreatedBy,
  unlinkSocialNetworkFromUpdateBy,
  linkSocialNetworkToUpdateBy,
} from '../../../../common';
import gql from 'graphql-tag';
import { merge } from 'lodash';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      updateSocialNetwork(
        input: updateSocialNetworkInput!
      ): updateSocialNetworkPayload
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
      logger.trace('updateSocialNetwork');
      let payload = context.connectors.SocialNetwork.getPayload(args);

      let result;
      let previous;

      if (args.id) {
        previous = await context.connectors.SocialNetwork.findOneById(args.id);
        result = await context.connectors.SocialNetwork.findOneByIdAndUpdate(
          args.id,
          merge({}, previous, payload),
        );
      }

      if (!result) {
        throw new Error('item of type SocialNetwork is not found for update');
      }

      if (context.pubsub) {
        context.pubsub.publish('SocialNetwork', {
          SocialNetwork: {
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
          await unlinkSocialNetworkFromCreatedBy({
            context,
            createdBy,
            socialNetwork: result,
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

          await linkSocialNetworkToCreatedBy({
            context,
            createdBy,
            socialNetwork: result,
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

          await linkSocialNetworkToCreatedBy({
            context,
            createdBy,
            socialNetwork: result,
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
          await unlinkSocialNetworkFromUpdateBy({
            context,
            updateBy,
            socialNetwork: result,
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

          await linkSocialNetworkToUpdateBy({
            context,
            updateBy,
            socialNetwork: result,
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

          await linkSocialNetworkToUpdateBy({
            context,
            updateBy,
            socialNetwork: result,
          });
        }
      }

      return {
        socialNetwork: result,
      };
    },
  ),
});
