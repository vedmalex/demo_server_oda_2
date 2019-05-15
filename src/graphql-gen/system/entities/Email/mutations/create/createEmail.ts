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
      const needCommit = await context.connectors.ensureTransaction();
      const txn = await context.connectors.transaction;
      logger.trace('createEmail');
      try {
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

        if (needCommit) {
          return txn.commit().then(() => ({
            email: emailEdge,
          }));
        } else {
          return {
            email: emailEdge,
          };
        }
      } catch (e) {
        await txn.abort();
        throw e;
      }
    },
  ),
});
