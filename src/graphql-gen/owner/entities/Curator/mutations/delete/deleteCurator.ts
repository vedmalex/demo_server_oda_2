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
      logger.trace('deleteCurator');
      let result;
      if (args.id) {
        await unlinkCuratorFromAll(
          [
            {
              key: 'id',
              type: 'ID',
              value: args.id,
            },
          ],
          context,
        );

        result = await context.connectors.Curator.findOneByIdAndRemove(args.id);
      }

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

      return {
        deletedItemId: result.id,
        curator: result,
      };
    },
  ),
});
