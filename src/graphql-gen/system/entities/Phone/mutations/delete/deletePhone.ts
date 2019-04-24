import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  unlinkPhoneFromAll,
} from '../../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      deletePhone(input: deletePhoneInput!): deletePhonePayload
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
      logger.trace('deletePhone');
      let result;
      if (args.id) {
        await unlinkPhoneFromAll(
          [
            {
              key: 'id',
              type: 'ID',
              value: args.id,
            },
          ],
          context,
        );

        result = await context.connectors.Phone.findOneByIdAndRemove(args.id);
      }

      if (!result) {
        throw new Error('item of type Phone is not found for delete');
      }

      if (context.pubsub) {
        context.pubsub.publish('Phone', {
          Phone: {
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
        phone: result,
      };
    },
  ),
});
