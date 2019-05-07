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
      createManyStudent(
        input: [createManyStudentInput!]
      ): [createManyStudentPayload]
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        person?: object /*Person*/;
        group?: object /*Group*/;
        meetings?: object /*Meeting*/[];
      }[],
      context: {
        connectors: RegisterConnectors;
        pubsub: PubSubEngine;
        resolvers: any;
      },
      info,
    ) => {
      logger.trace('createManyStudent');
      const result = args.map(input => {
        return context.resolvers.RootMutation.createPerson(
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
