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
    extend type RootMutation {
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
      const needCommit = await context.connectors.ensureTransaction();
      const txn = await context.connectors.transaction;
      logger.trace('updateManySubjectCourse');
      const result = args.map(input => {
        return context.resolvers.RootMutation.updatePerson(
          undefined,
          { input },
          context,
          info,
        );
      });

      try {
        const res = await Promise.all(result);
        if (needCommit) {
          return txn.commit().then(() => res);
        } else {
          return res;
        }
      } catch (err) {
        await txn.abort();
        throw err;
      }
    },
  ),
});
