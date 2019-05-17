import gql from 'graphql-tag';
import { Schema } from '../../../../common';

import { logger, mutateSafe } from '../../../../common';

export default new Schema({
  name: 'SocialNetwork.mutation.delete.safe',
  schema: gql`
    extend type Mutation {
      deleteManySocialNetworkSafe(
        input: [deleteManySocialNetworkInput!]
      ): [deleteManySocialNetworkPayload]
      deleteSocialNetworkSafe(
        input: deleteSocialNetworkInput!
      ): deleteSocialNetworkPayload
    }
  `,
  resolver: {
    Mutation: {
      deleteManySocialNetworkSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('deleteManySocialNetworkSafe');
          return context.resolvers.Mutation.deleteManySocialNetwork(
            root,
            args,
            context,
            info,
          );
        },
      ),
      deleteSocialNetworkSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('deleteSocialNetworkSafe');
          return context.resolvers.Mutation.deleteSocialNetwork(
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
