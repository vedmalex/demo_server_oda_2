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
      deleteManySubjectCourse(
        input: [deleteManySubjectCourseInput!]
      ): [deleteManySubjectCoursePayload]
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
      }[],
      context: {
        connectors: RegisterConnectors;
        pubsub: PubSubEngine;
        resolvers: any;
      },
      info,
    ) => {
      logger.trace('deleteManySubjectCourse');
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
