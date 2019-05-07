import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
} from '../../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      deleteManySubject(
        input: [deleteManySubjectInput!]
      ): [deleteManySubjectPayload]
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        name?: string;
      }[],
      context: {
        connectors: RegisterConnectors;
        pubsub: PubSubEngine;
        resolvers: any;
      },
      info,
    ) => {
      logger.trace('deleteManySubject');
      const result = args.map(input => {
        return context.resolvers.RootMutation.deletePerson(
          undefined,
          { input },
          context,
          info,
        );
      });

      return Promise.all(result);
    },
  ),
});
