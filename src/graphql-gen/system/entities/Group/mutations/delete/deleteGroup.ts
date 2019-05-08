import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  unlinkGroupFromAll,
} from '../../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      deleteGroup(input: deleteGroupInput!): deleteGroupPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        name?: string;
      },
      context: {
        connectors: RegisterConnectors;
        pubsub: PubSubEngine;
        userGQL: (args: any) => Promise<any>;
      },
      info,
    ) => {
      logger.trace('deleteGroup');
      let result;
      let deletePromise = [];
      if (args.id) {
        deletePromise.push(
          unlinkGroupFromAll(
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
          context.connectors.Group.findOneByIdAndRemove(args.id).then(
            res => (result = res),
          ),
        );
      } else if (args.name) {
        deletePromise.push(
          unlinkGroupFromAll(
            [
              {
                key: 'name',
                type: 'String',
                value: args.name,
              },
            ],
            context,
          ),
        );
        deletePromise.push(
          context.connectors.Group.findOneByNameAndRemove(args.name).then(
            res => (result = res),
          ),
        );
      }

      await Promise.all(deletePromise);

      if (!result) {
        throw new Error('item of type Group is not found for delete');
      }

      if (context.pubsub) {
        context.pubsub.publish('Group', {
          Group: {
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
        group: result,
      };
    },
  ),
});
