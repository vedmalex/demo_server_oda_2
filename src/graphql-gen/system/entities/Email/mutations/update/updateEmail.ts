import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
} from '../../../../common';
import gql from 'graphql-tag';
import { merge } from 'lodash';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      updateEmail(input: updateEmailInput!): updateEmailPayload
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
      logger.trace('updateEmail');
      try {
        let payload = context.connectors.Email.getPayload(args);

        let result;
        let previous;

        if (args.id) {
          previous = await context.connectors.Email.findOneById(args.id);
          result = await context.connectors.Email.findOneByIdAndUpdate(
            args.id,
            merge({}, previous, payload),
          );
        } else if (args.email) {
          delete payload.email;
          previous = await context.connectors.Email.findOneByEmail(args.email);
          result = await context.connectors.Email.findOneByEmailAndUpdate(
            args.email,
            merge({}, previous, payload),
          );
        }

        if (!result) {
          throw new Error('item of type Email is not found for update');
        }

        if (context.pubsub) {
          context.pubsub.publish('Email', {
            Email: {
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

        if (needCommit) {
          return txn.commit().then(() => ({
            email: result,
          }));
        } else {
          return {
            email: result,
          };
        }
      } catch (e) {
        await txn.abort();
        throw e;
      }
    },
  ),
});
