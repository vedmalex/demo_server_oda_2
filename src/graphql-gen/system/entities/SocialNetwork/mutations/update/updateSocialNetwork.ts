import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  ensurePerson,
  unlinkSocialNetworkFromPerson,
  linkSocialNetworkToPerson,
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
        account?: string;
        url?: string;
        type?: string;
        person?: object /*Person*/;
        personUnlink?: object /*Person*/;
        personCreate?: object /*Person*/;
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
      } else if (args.account) {
        delete payload.account;
        previous = await context.connectors.SocialNetwork.findOneByAccount(
          args.account,
        );
        result = await context.connectors.SocialNetwork.findOneByAccountAndUpdate(
          args.account,
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

      if (args.personUnlink) {
        let $item = args.personUnlink;
        if ($item) {
          let person = await ensurePerson({
            args: $item,
            context,
            create: false,
          });
          await unlinkSocialNetworkFromPerson({
            context,
            person,
            socialNetwork: result,
          });
        }
      }

      if (args.personCreate) {
        let $item = args.personCreate as { id };
        if ($item) {
          let person = await ensurePerson({
            args: $item,
            context,
            create: true,
          });

          await linkSocialNetworkToPerson({
            context,
            person,
            socialNetwork: result,
          });
        }
      }

      if (args.person) {
        let $item = args.person as { id };
        if ($item) {
          let person = await ensurePerson({
            args: $item,
            context,
            create: false,
          });

          await linkSocialNetworkToPerson({
            context,
            person,
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
