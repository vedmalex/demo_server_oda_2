import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  unlinkEmailFromAll,
} from '../../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      deleteEmail(input: deleteEmailInput!): deleteEmailPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        email?: string;
      },
      context: {
        connectors: RegisterConnectors;
        pubsub: PubSubEngine;
        userGQL: (args: any) => Promise<any>;
      },
      info,
    ) => {
      logger.trace('deleteEmail');
      let result;
      if (args.id) {
        await unlinkEmailFromAll(
          [
            {
              key: 'id',
              type: 'ID',
              value: args.id,
            },
          ],
          context,
        );

        result = await context.connectors.Email.findOneByIdAndRemove(args.id);
      } else if (args.email) {
        await unlinkEmailFromAll(
          [
            {
              key: 'email',
              type: 'String',
              value: args.email,
            },
          ],
          context,
        );

        result = await context.connectors.Email.findOneByEmailAndRemove(
          args.email,
        );
      }

      if (!result) {
        throw new Error('item of type Email is not found for delete');
      }

      if (context.pubsub) {
        context.pubsub.publish('Email', {
          Email: {
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
        email: result,
      };
    },
  ),
});
