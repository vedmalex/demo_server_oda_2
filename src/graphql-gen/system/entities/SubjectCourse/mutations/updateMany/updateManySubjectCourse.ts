import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
} from '../../../../common';
import gql from 'graphql-tag';
import { merge } from 'lodash';

export default new Mutation({
  schema: gql`
    extend type Mutation {
      updateManySubjectCourse(
        input: [updateManySubjectCourseInput!]
      ): [updateManySubjectCoursePayload]
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
        subjectLinkUnlink?: object /*Subject*/;
        subjectLinkCreate?: object /*Subject*/;
        courseLink?: object /*Course*/;
        courseLinkUnlink?: object /*Course*/;
        courseLinkCreate?: object /*Course*/;
      }[],
      context: {
        connectors: RegisterConnectors;
        pubsub: PubSubEngine;
        resolvers: any;
      },
      info,
    ) => {
      logger.trace('updateManySubjectCourse');
      const result = args.map(input => {
        return context.resolvers.Mutation.updateSubjectCourse(
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
