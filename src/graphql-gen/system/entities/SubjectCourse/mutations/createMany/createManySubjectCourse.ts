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
      createManySubjectCourse(
        input: [createManySubjectCourseInput!]
      ): [createManySubjectCoursePayload]
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        description?: string;
        subject?: string;
        course?: string;
        hours?: number;
        level?: string;
        subjectLink?: object /*Subject*/;
        courseLink?: object /*Course*/;
      }[],
      context: {
        connectors: RegisterConnectors;
        pubsub: PubSubEngine;
        resolvers: any;
      },
      info,
    ) => {
      logger.trace('createManySubjectCourse');
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
