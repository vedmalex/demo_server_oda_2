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
    extend type Mutation {
      createManyCourse(
        input: [createManyCourseInput!]
      ): [createManyCoursePayload]
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        name?: string;
        subjects?: object /*Subject*/[];
        groups?: object /*Group*/[];
      }[],
      context: {
        connectors: RegisterConnectors;
        pubsub: PubSubEngine;
        resolvers: any;
      },
      info,
    ) => {
      logger.trace('createManyCourse');
      const result = args.map(input => {
        return context.resolvers.Mutation.createCourse(
          undefined,
          { input },
          context,
          info,
        );
      });

      return await Promise.all(result);
    },
  ),
});
