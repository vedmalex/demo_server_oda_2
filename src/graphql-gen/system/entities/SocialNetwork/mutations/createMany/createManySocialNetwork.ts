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
      createManySocialNetwork(
        input: [createManySocialNetworkInput!]
      ): [createManySocialNetworkPayload]
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        account?: string;
        url?: string;
        type?: string;
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
      logger.trace('createManySocialNetwork');
      const result = args.map(input => {
        return context.resolvers.RootMutation.createPerson(
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
