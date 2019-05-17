import gql from 'graphql-tag';
import { Schema } from '../../../../common';

import { logger, mutateSafe } from '../../../../common';

export default new Schema({
  name: 'Group.mutation.update.safe',
  schema: gql`
    extend type Mutation {
      updateManyGroupSafe(
        input: [updateManyGroupInput!]
      ): [updateManyGroupPayload]
      updateGroupSafe(input: updateGroupInput!): updateGroupPayload
    }
  `,
  resolver: {
    Mutation: {
      updateManyGroupSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('updateManyGroupSafe');
          return context.resolvers.Mutation.updateManyGroup(
            root,
            args,
            context,
            info,
          );
        },
      ),
      updateGroupSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('updateGroupSafe');
          return context.resolvers.Mutation.updateGroup(
            root,
            args,
            context,
            info,
          );
        },
      ),
    },
  },
});
