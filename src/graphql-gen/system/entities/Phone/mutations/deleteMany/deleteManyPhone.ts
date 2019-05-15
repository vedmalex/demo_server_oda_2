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
      deleteManyPhone(input: [deleteManyPhoneInput!]): [deleteManyPhonePayload]
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        phoneNumber?: string;
      }[],
      context: {
        connectors: RegisterConnectors;
        pubsub: PubSubEngine;
        resolvers: any;
      },
      info,
    ) => {
      const needCommit = await context.connectors.ensureTransaction();
      const txn = await context.connectors.transaction;
      logger.trace('deleteManyPhone');
      const result = args.map(input => {
        return context.resolvers.RootMutation.deletePerson(
          undefined,
          { input },
          context,
          info,
        );
      });

      try {
        const res = await Promise.all(result);
        if (needCommit) {
          return txn.commit().then(() => res);
        } else {
          return res;
        }
      } catch (err) {
        await txn.abort();
        throw err;
      }
    },
  ),
});
