import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  unlinkUserFromAll,
} from '../../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      deleteUser(input: deleteUserInput!): deleteUserPayload
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
      logger.trace('deleteUser');
      let result;
      if (args.id) {
        await unlinkUserFromAll(
          [
            {
              key: 'id',
              type: 'ID',
              value: args.id,
            },
          ],
          context,
        );

        result = await context.connectors.User.findOneByIdAndRemove(args.id);
      }

      if (!result) {
        throw new Error('item of type User is not found for delete');
      }

      if (context.pubsub) {
        context.pubsub.publish('User', {
          User: {
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
        user: result,
      };
    },
  ),
});
