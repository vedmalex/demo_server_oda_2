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
      addToPhoneBelongsToUpdateBy(
        input: addToPhoneBelongsToUpdateByInput
      ): addToPhoneBelongsToUpdateByPayload
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
      logger.trace('addToPhoneBelongsToUpdateBy');
      let phone = args.phone;
      let user = args.user;
      let payload = {
        phone,
        user,
      };

      await context.connectors.Phone.addToUpdateBy(payload);

      let source = await context.connectors.Phone.findOneById(phone);

      if (context.pubsub) {
        context.pubsub.publish('Phone', {
          Phone: {
            mutation: 'LINK',
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
