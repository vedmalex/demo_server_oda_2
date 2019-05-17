import gql from 'graphql-tag';
import { Schema } from '../../../../common';

import { logger, mutateSafe } from '../../../../common';

export default new Schema({
  name: 'Group.mutation.delete.safe',
  schema: gql`
    extend type Mutation {
      deleteManyGroupSafe(
        input: [deleteManyGroupInput!]
      ): [deleteManyGroupPayload]
      deleteGroupSafe(input: deleteGroupInput!): deleteGroupPayload
    }
  `,
  resolver: {
    Mutation: {
      deleteManyGroupSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('deleteManyGroupSafe');
          return context.resolvers.Mutation.deleteManyGroup(
            root,
            args,
            context,
            info,
          );
        },
      ),
      deleteGroupSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('deleteGroupSafe');
          return context.resolvers.Mutation.deleteGroup(
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
