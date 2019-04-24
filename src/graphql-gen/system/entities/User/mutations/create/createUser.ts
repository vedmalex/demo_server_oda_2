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
    extend type RootMutation {
      createUser(input: createUserInput!): createUserPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        isAdmin?: boolean;
        isSystem?: boolean;
        enabled?: boolean;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('createUser');
      let create = context.connectors.User.getPayload(args, false);

      let result = await context.connectors.User.create(create);

      if (context.pubsub) {
        context.pubsub.publish('User', {
          User: {
            mutation: 'CREATE',
            node: result,
            previous: null,
            updatedFields: [],
            payload: args,
          },
        });
      }

      let userEdge = {
        cursor: result.id,
        node: result,
      };

      return {
        user: userEdge,
      };
    },
  ),
});
