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
        phoneNumber?: string;
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
      let deletePromise = [];
      if (args.id) {
        deletePromise.push(
          unlinkPhoneFromAll(
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
          context.connectors.Phone.findOneByIdAndRemove(args.id).then(
            res => (result = res),
          ),
        );
      } else if (args.phoneNumber) {
        deletePromise.push(
          unlinkPhoneFromAll(
            [
              {
                key: 'phoneNumber',
                type: 'String',
                value: args.phoneNumber,
              },
            ],
            context,
          ),
        );
        deletePromise.push(
          context.connectors.Phone.findOneByPhoneNumberAndRemove(
            args.phoneNumber,
          ).then(res => (result = res)),
        );
      }

      await Promise.all(deletePromise);

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
