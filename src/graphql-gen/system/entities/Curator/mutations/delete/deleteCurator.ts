import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  unlinkCuratorFromAll,
} from '../../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      deleteCurator(input: deleteCuratorInput!): deleteCuratorPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
      },
      context: {
        connectors: RegisterConnectors;
        pubsub: PubSubEngine;
        userGQL: (args: any) => Promise<any>;
      },
      info,
    ) => {
      const needCommit = await context.connectors.ensureTransaction();
      const txn = await context.connectors.transaction;
      logger.trace('deleteCurator');
      try {
        let result;
        let deletePromise = [];
        if (args.id) {
          deletePromise.push(
            unlinkCuratorFromAll(
              [
                {
                  key: 'id',
                  type: 'ID',
                  value: args.id,
                },
              ],
              context,
            ),
          );
          deletePromise.push(
            context.connectors.Curator.findOneByIdAndRemove(args.id).then(
              res => (result = res),
            ),
          );
        }

        await Promise.all(deletePromise);

        if (!result) {
          throw new Error('item of type Curator is not found for delete');
        }

        if (context.pubsub) {
          context.pubsub.publish('Curator', {
            Curator: {
              mutation: 'DELETE',
              node: result,
              previous: null,
              updatedFields: [],
              payload: args,
            },
          });
        }

        if (needCommit) {
          return txn.commit().then(() => ({
            deletedItemId: result.id,
            curator: result,
          }));
        } else {
          return {
            deletedItemId: result.id,
            curator: result,
          };
        }
      } catch (e) {
        await txn.abort();
        throw e;
      }
    },
  ),
});
