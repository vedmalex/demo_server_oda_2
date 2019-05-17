import gql from 'graphql-tag';
import { Schema } from '../../../../common';

import { logger, mutateSafe } from '../../../../common';

export default new Schema({
  name: 'User.mutation.create.safe',
  schema: gql`
    extend type Mutation {
      createManyUserSafe(input: [createManyUserInput!]): [createManyUserPayload]
      createUserSafe(input: createUserInput!): createUserPayload
    }
  `,
  resolver: {
    Mutation: {
      createManyUserSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('createManyUserSafe');
          return context.resolvers.Mutation.createManyUser(
            root,
            args,
            context,
            info,
          );
        },
      ),
      createUserSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('createUserSafe');
          return context.resolvers.Mutation.createUser(
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
