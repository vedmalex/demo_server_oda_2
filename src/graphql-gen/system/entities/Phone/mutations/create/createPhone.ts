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
      createPhone(input: createPhoneInput!): createPhonePayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        phoneNumber?: string;
        type?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      const needCommit = await context.connectors.ensureTransaction();
      const txn = await context.connectors.transaction;
      logger.trace('createPhone');
      try {
        let create = context.connectors.Phone.getPayload(args, false);

        let result = await context.connectors.Phone.create(create);

        if (context.pubsub) {
          context.pubsub.publish('Phone', {
            Phone: {
              mutation: 'CREATE',
              node: result,
              previous: null,
              updatedFields: [],
              payload: args,
            },
          });
        }

        let phoneEdge = {
          cursor: result.id,
          node: result,
        };

        if (needCommit) {
          return txn.commit().then(() => ({
            phone: phoneEdge,
          }));
        } else {
          return {
            phone: phoneEdge,
          };
        }
      } catch (e) {
        await txn.abort();
        throw e;
      }
    },
  ),
});
