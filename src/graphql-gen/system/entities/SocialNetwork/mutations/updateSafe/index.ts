import gql from 'graphql-tag';
import { Schema } from '../../../../common';

import { logger, mutateSafe } from '../../../../common';

export default new Schema({
  name: 'SocialNetwork.mutation.update.safe',
  schema: gql`
    extend type Mutation {
      updateManySocialNetworkSafe(
        input: [updateManySocialNetworkInput!]
      ): [updateManySocialNetworkPayload]
      updateSocialNetworkSafe(
        input: updateSocialNetworkInput!
      ): updateSocialNetworkPayload
    }
  `,
  resolver: {
    Mutation: {
      updateManySocialNetworkSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('updateManySocialNetworkSafe');
          return context.resolvers.Mutation.updateManySocialNetwork(
            root,
            args,
            context,
            info,
          );
        },
      ),
      updateSocialNetworkSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('updateSocialNetworkSafe');
          return context.resolvers.Mutation.updateSocialNetwork(
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
