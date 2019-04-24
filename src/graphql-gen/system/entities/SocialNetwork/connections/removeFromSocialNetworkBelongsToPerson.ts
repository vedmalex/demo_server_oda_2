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
      removeFromSocialNetworkBelongsToPerson(
        input: removeFromSocialNetworkBelongsToPersonInput
      ): removeFromSocialNetworkBelongsToPersonPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        socialNetwork?: string;
        person?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('removeFromSocialNetworkBelongsToPerson');
      let socialNetwork = args.socialNetwork;
      let person = args.person;
      let payload = {
        socialNetwork,
        person,
      };
      await context.connectors.SocialNetwork.removeFromPerson(payload);

      let source = await context.connectors.SocialNetwork.findOneById(
        socialNetwork,
      );

      if (context.pubsub) {
        context.pubsub.publish('SocialNetwork', {
          SocialNetwork: {
            mutation: 'UNLINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                socialNetwork: args.socialNetwork,
                person: args.person,
              },
              relation: 'person',
            },
          },
        });

        let dest = await context.connectors.Person.findOneById(person);

        context.pubsub.publish('Person', {
          Person: {
            mutation: 'UNLINK',
            node: dest,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                socialNetwork: args.socialNetwork,
                person: args.person,
              },
              relation: 'socialNetworks',
            },
          },
        });
      }

      return {
        socialNetwork: source,
      };
    },
  ),
});
