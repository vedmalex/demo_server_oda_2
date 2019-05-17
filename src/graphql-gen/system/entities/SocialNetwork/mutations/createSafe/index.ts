import gql from 'graphql-tag';
import { Schema } from '../../../../common';

import { logger, mutateSafe } from '../../../../common';

export default new Schema({
  name: 'SocialNetwork.mutation.create.safe',
  schema: gql`
    extend type Mutation {
      createManySocialNetworkSafe(
        input: [createManySocialNetworkInput!]
      ): [createManySocialNetworkPayload]
      createSocialNetworkSafe(
        input: createSocialNetworkInput!
      ): createSocialNetworkPayload
    }
  `,
  resolver: {
    Mutation: {
      createManySocialNetworkSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('createManySocialNetworkSafe');
          return context.resolvers.Mutation.createManySocialNetwork(
            root,
            args,
            context,
            info,
          );
        },
      ),
      createSocialNetworkSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('createSocialNetworkSafe');
          return context.resolvers.Mutation.createSocialNetwork(
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
