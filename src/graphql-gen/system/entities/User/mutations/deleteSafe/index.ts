import gql from 'graphql-tag';
import { Schema } from '../../../../common';

import { logger, mutateSafe } from '../../../../common';

export default new Schema({
  name: 'User.mutation.delete.safe',
  schema: gql`
    extend type Mutation {
      deleteManyUserSafe(input: [deleteManyUserInput!]): [deleteManyUserPayload]
      deleteUserSafe(input: deleteUserInput!): deleteUserPayload
    }
  `,
  resolver: {
    Mutation: {
      deleteManyUserSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('deleteManyUserSafe');
          return context.resolvers.Mutation.deleteManyUser(
            root,
            args,
            context,
            info,
          );
        },
      ),
      deleteUserSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('deleteUserSafe');
          return context.resolvers.Mutation.deleteUser(
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
