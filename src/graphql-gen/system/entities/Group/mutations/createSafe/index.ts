import gql from 'graphql-tag';
import { Schema } from '../../../../common';

import { logger, mutateSafe } from '../../../../common';

export default new Schema({
  name: 'Group.mutation.create.safe',
  schema: gql`
    extend type Mutation {
      createManyGroupSafe(
        input: [createManyGroupInput!]
      ): [createManyGroupPayload]
      createGroupSafe(input: createGroupInput!): createGroupPayload
    }
  `,
  resolver: {
    Mutation: {
      createManyGroupSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('createManyGroupSafe');
          return context.resolvers.Mutation.createManyGroup(
            root,
            args,
            context,
            info,
          );
        },
      ),
      createGroupSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('createGroupSafe');
          return context.resolvers.Mutation.createGroup(
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
