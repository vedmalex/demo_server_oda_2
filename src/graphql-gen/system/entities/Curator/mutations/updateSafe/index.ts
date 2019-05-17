import gql from 'graphql-tag';
import { Schema } from '../../../../common';

import { logger, mutateSafe } from '../../../../common';

export default new Schema({
  name: 'Curator.mutation.update.safe',
  schema: gql`
    extend type Mutation {
      updateManyCuratorSafe(
        input: [updateManyCuratorInput!]
      ): [updateManyCuratorPayload]
      updateCuratorSafe(input: updateCuratorInput!): updateCuratorPayload
    }
  `,
  resolver: {
    Mutation: {
      updateManyCuratorSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('updateManyCuratorSafe');
          return context.resolvers.Mutation.updateManyCurator(
            root,
            args,
            context,
            info,
          );
        },
      ),
      updateCuratorSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('updateCuratorSafe');
          return context.resolvers.Mutation.updateCurator(
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
