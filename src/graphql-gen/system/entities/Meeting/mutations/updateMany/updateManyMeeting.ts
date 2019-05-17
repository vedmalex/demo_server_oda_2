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
      updateManyMeeting(
        input: [updateManyMeetingInput!]
      ): [updateManyMeetingPayload]
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        date?: Date;
        curator?: object /*Curator*/;
        curatorUnlink?: object /*Curator*/;
        curatorCreate?: object /*Curator*/;
        group?: object /*Group*/;
        groupUnlink?: object /*Group*/;
        groupCreate?: object /*Group*/;
        students?: object /*Student*/[];
        studentsUnlink?: object /*Student*/[];
        studentsCreate?: object /*Student*/[];
      }[],
      context: {
        connectors: RegisterConnectors;
        pubsub: PubSubEngine;
        resolvers: any;
      },
      info,
    ) => {
      logger.trace('updateManyMeeting');
      const result = args.map(input => {
        return context.resolvers.Mutation.updateMeeting(
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
