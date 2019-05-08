import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  unlinkSubjectFromAll,
} from '../../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      deleteSubject(input: deleteSubjectInput!): deleteSubjectPayload
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
      logger.trace('deleteSubject');
      let result;
      let deletePromise = [];
      if (args.id) {
        deletePromise.push(
          unlinkSubjectFromAll(
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
          context.connectors.Subject.findOneByIdAndRemove(args.id).then(
            res => (result = res),
          ),
        );
      } else if (args.name) {
        deletePromise.push(
          unlinkSubjectFromAll(
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
          context.connectors.Subject.findOneByNameAndRemove(args.name).then(
            res => (result = res),
          ),
        );
      }

      await Promise.all(deletePromise);

      if (!result) {
        throw new Error('item of type Subject is not found for delete');
      }

      if (context.pubsub) {
        context.pubsub.publish('Subject', {
          Subject: {
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
        subject: result,
      };
    },
  ),
});
