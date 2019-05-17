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
    extend type Mutation {
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
      let deletePromise = [];
      if (args.id) {
        deletePromise.push(
          unlinkEmailFromAll(
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
          context.connectors.Email.findOneByIdAndRemove(args.id).then(
            res => (result = res),
          ),
        );
      } else if (args.email) {
        deletePromise.push(
          unlinkEmailFromAll(
            [
              {
                key: 'email',
                type: 'String',
                value: args.email,
              },
            ],
            context,
          ),
        );
        deletePromise.push(
          context.connectors.Email.findOneByEmailAndRemove(args.email).then(
            res => (result = res),
          ),
        );
      }

      await Promise.all(deletePromise);

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
