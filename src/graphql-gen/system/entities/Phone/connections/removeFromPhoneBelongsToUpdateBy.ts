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
      removeFromPhoneBelongsToUpdateBy(
        input: removeFromPhoneBelongsToUpdateByInput
      ): removeFromPhoneBelongsToUpdateByPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        phone?: string;
        user?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('removeFromPhoneBelongsToUpdateBy');
      let phone = args.phone;
      let user = args.user;
      let payload = {
        phone,
        user,
      };
      await context.connectors.Phone.removeFromUpdateBy(payload);

      let source = await context.connectors.Phone.findOneById(phone);

      if (context.pubsub) {
        context.pubsub.publish('Phone', {
          Phone: {
            mutation: 'UNLINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                phone: args.phone,
                user: args.user,
              },
              relation: 'updateBy',
            },
          },
        });
      }

      return {
        phone: source,
      };
    },
  ),
});
