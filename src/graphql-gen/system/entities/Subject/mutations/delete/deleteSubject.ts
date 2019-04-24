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
      if (args.id) {
        await unlinkSubjectFromAll(
          [
            {
              key: 'id',
              type: 'ID',
              value: args.id,
            },
          ],
          context,
        );

        result = await context.connectors.Subject.findOneByIdAndRemove(args.id);
      }

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
