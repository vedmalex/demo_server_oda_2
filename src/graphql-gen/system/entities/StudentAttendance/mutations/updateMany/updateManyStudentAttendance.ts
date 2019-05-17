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
      updateManyStudentAttendance(
        input: [updateManyStudentAttendanceInput!]
      ): [updateManyStudentAttendancePayload]
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        meeting?: string;
        student?: string;
        present?: boolean;
        specialNotes?: string;
        superpuper?: string;
        meetingLink?: object /*Meeting*/;
        meetingLinkUnlink?: object /*Meeting*/;
        meetingLinkCreate?: object /*Meeting*/;
        studentLink?: object /*Student*/;
        studentLinkUnlink?: object /*Student*/;
        studentLinkCreate?: object /*Student*/;
      }[],
      context: {
        connectors: RegisterConnectors;
        pubsub: PubSubEngine;
        resolvers: any;
      },
      info,
    ) => {
      logger.trace('updateManyStudentAttendance');
      const result = args.map(input => {
        return context.resolvers.Mutation.updateStudentAttendance(
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
