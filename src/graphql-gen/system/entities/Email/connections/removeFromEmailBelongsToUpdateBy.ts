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
      removeFromEmailBelongsToUpdateBy(
        input: removeFromEmailBelongsToUpdateByInput
      ): removeFromEmailBelongsToUpdateByPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        email?: string;
        user?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('removeFromEmailBelongsToUpdateBy');
      let email = args.email;
      let user = args.user;
      let payload = {
        email,
        user,
      };
      await context.connectors.Email.removeFromUpdateBy(payload);

      let source = await context.connectors.Email.findOneById(email);

      if (context.pubsub) {
        context.pubsub.publish('Email', {
          Email: {
            mutation: 'UNLINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                email: args.email,
                user: args.user,
              },
              relation: 'updateBy',
            },
          },
        });
      }

      return {
        email: source,
      };
    },
  ),
});
