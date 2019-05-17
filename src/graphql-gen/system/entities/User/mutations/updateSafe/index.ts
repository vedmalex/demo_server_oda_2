import gql from 'graphql-tag';
import { Schema } from '../../../../common';

import { logger, mutateSafe } from '../../../../common';

export default new Schema({
  name: 'User.mutation.update.safe',
  schema: gql`
    extend type Mutation {
      updateManyUserSafe(input: [updateManyUserInput!]): [updateManyUserPayload]
      updateUserSafe(input: updateUserInput!): updateUserPayload
    }
  `,
  resolver: {
    Mutation: {
      updateManyUserSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('updateManyUserSafe');
          return context.resolvers.Mutation.updateManyUser(
            root,
            args,
            context,
            info,
          );
        },
      ),
      updateUserSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('updateUserSafe');
          return context.resolvers.Mutation.updateUser(
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
