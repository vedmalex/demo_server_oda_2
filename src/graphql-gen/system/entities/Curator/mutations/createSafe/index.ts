import gql from 'graphql-tag';
import { Schema } from '../../../../common';

import { logger, mutateSafe } from '../../../../common';

export default new Schema({
  name: 'Curator.mutation.create.safe',
  schema: gql`
    extend type Mutation {
      createManyCuratorSafe(
        input: [createManyCuratorInput!]
      ): [createManyCuratorPayload]
      createCuratorSafe(input: createCuratorInput!): createCuratorPayload
    }
  `,
  resolver: {
    Mutation: {
      createManyCuratorSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('createManyCuratorSafe');
          return context.resolvers.Mutation.createManyCurator(
            root,
            args,
            context,
            info,
          );
        },
      ),
      createCuratorSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('createCuratorSafe');
          return context.resolvers.Mutation.createCurator(
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
