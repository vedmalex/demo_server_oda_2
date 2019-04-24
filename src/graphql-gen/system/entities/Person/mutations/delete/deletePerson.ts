import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  unlinkPersonFromAll,
} from '../../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      deletePerson(input: deletePersonInput!): deletePersonPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        spiritualName?: string;
        fullName?: string;
      },
      context: {
        connectors: RegisterConnectors;
        pubsub: PubSubEngine;
        userGQL: (args: any) => Promise<any>;
      },
      info,
    ) => {
      logger.trace('deletePerson');
      let result;
      if (args.id) {
        await unlinkPersonFromAll(
          [
            {
              key: 'id',
              type: 'ID',
              value: args.id,
            },
          ],
          context,
        );

        result = await context.connectors.Person.findOneByIdAndRemove(args.id);
      } else if (args.spiritualName) {
        await unlinkPersonFromAll(
          [
            {
              key: 'spiritualName',
              type: 'String',
              value: args.spiritualName,
            },
          ],
          context,
        );

        result = await context.connectors.Person.findOneBySpiritualNameAndRemove(
          args.spiritualName,
        );
      } else if (args.fullName) {
        await unlinkPersonFromAll(
          [
            {
              key: 'fullName',
              type: 'String',
              value: args.fullName,
            },
          ],
          context,
        );

        result = await context.connectors.Person.findOneByFullNameAndRemove(
          args.fullName,
        );
      }

      if (!result) {
        throw new Error('item of type Person is not found for delete');
      }

      if (context.pubsub) {
        context.pubsub.publish('Person', {
          Person: {
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
        person: result,
      };
    },
  ),
});
