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
    extend type Mutation {
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
      let deletePromise = [];
      if (args.id) {
        deletePromise.push(
          unlinkPersonFromAll(
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
          context.connectors.Person.findOneByIdAndRemove(args.id).then(
            res => (result = res),
          ),
        );
      } else if (args.spiritualName) {
        deletePromise.push(
          unlinkPersonFromAll(
            [
              {
                key: 'spiritualName',
                type: 'String',
                value: args.spiritualName,
              },
            ],
            context,
          ),
        );
        deletePromise.push(
          context.connectors.Person.findOneBySpiritualNameAndRemove(
            args.spiritualName,
          ).then(res => (result = res)),
        );
      } else if (args.fullName) {
        deletePromise.push(
          unlinkPersonFromAll(
            [
              {
                key: 'fullName',
                type: 'String',
                value: args.fullName,
              },
            ],
            context,
          ),
        );
        deletePromise.push(
          context.connectors.Person.findOneByFullNameAndRemove(
            args.fullName,
          ).then(res => (result = res)),
        );
      }

      await Promise.all(deletePromise);

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
