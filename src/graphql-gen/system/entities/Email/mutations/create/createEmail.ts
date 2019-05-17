import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
} from '../../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type Mutation {
      createEmail(input: createEmailInput!): createEmailPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        email?: string;
        type?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('createEmail');
      let create = context.connectors.Email.getPayload(args, false);

      let result = await context.connectors.Email.create(create);

      if (context.pubsub) {
        context.pubsub.publish('Email', {
          Email: {
            mutation: 'CREATE',
            node: result,
            previous: null,
            updatedFields: [],
            payload: args,
          },
        });
      }

      let emailEdge = {
        cursor: result.id,
        node: result,
      };

      return {
        email: emailEdge,
      };
    },
  ),
});
