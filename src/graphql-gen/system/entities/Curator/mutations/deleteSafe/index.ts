import gql from 'graphql-tag';
import { Schema } from '../../../../common';

import { logger, mutateSafe } from '../../../../common';

export default new Schema({
  name: 'Curator.mutation.delete.safe',
  schema: gql`
    extend type Mutation {
      deleteManyCuratorSafe(
        input: [deleteManyCuratorInput!]
      ): [deleteManyCuratorPayload]
      deleteCuratorSafe(input: deleteCuratorInput!): deleteCuratorPayload
    }
  `,
  resolver: {
    Mutation: {
      deleteManyCuratorSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('deleteManyCuratorSafe');
          return context.resolvers.Mutation.deleteManyCurator(
            root,
            args,
            context,
            info,
          );
        },
      ),
      deleteCuratorSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('deleteCuratorSafe');
          return context.resolvers.Mutation.deleteCurator(
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
