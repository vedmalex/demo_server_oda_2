import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
} from '../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      removeFromPersonHasManySocialNetworks(
        input: removeFromPersonHasManySocialNetworksInput
      ): removeFromPersonHasManySocialNetworksPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        person?: string;
        socialNetwork?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('removeFromPersonHasManySocialNetworks');
      let person = args.person;
      let socialNetwork = args.socialNetwork;
      let payload = {
        person,
        socialNetwork,
      };
      await context.connectors.Person.removeFromSocialNetworks(payload);

      let source = await context.connectors.Person.findOneById(person);

      if (context.pubsub) {
        context.pubsub.publish('Person', {
          Person: {
            mutation: 'UNLINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                person: args.person,
                socialNetwork: args.socialNetwork,
              },
              relation: 'socialNetworks',
            },
          },
        });
      }

      return {
        person: source,
      };
    },
  ),
});
