import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
} from '../../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type Mutation {
      createManyPhone(input: [createManyPhoneInput!]): [createManyPhonePayload]
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
      logger.trace('createManyPhone');
      const result = args.map(input => {
        return context.resolvers.Mutation.createPhone(
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
