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
      updateManyPhone(input: [updateManyPhoneInput!]): [updateManyPhonePayload]
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        phoneNumber?: string;
        type?: string;
      }[],
      context: {
        connectors: RegisterConnectors;
        pubsub: PubSubEngine;
        resolvers: any;
      },
      info,
    ) => {
      logger.trace('updateManyPhone');
      const result = args.map(input => {
        return context.resolvers.Mutation.updatePhone(
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
