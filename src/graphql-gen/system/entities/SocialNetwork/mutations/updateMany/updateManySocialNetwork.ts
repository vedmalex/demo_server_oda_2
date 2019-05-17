import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
} from '../../../../common';
import gql from 'graphql-tag';
import { merge } from 'lodash';

export default new Mutation({
  schema: gql`
    extend type Mutation {
      updateManySocialNetwork(
        input: [updateManySocialNetworkInput!]
      ): [updateManySocialNetworkPayload]
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        account?: string;
        url?: string;
        type?: string;
      }[],
      context: {
        connectors: RegisterConnectors;
        pubsub: PubSubEngine;
        resolvers: any;
      },
      info,
    ) => {
      logger.trace('updateManySocialNetwork');
      const result = args.map(input => {
        return context.resolvers.Mutation.updateSocialNetwork(
          undefined,
          { input },
          context,
          info,
        );
      });

      return await Promise.all(result);
    },
  ),
});
