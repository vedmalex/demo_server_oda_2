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
    extend type Mutation {
      removeFromPersonHasOneAsCurator(
        input: removeFromPersonHasOneAsCuratorInput
      ): removeFromPersonHasOneAsCuratorPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        person?: string;
        curator?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('removeFromPersonHasOneAsCurator');
      let person = args.person;
      let curator = args.curator;
      let payload = {
        person,
        curator,
      };
      await context.connectors.Person.removeFromAsCurator(payload);

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
                curator: args.curator,
              },
              relation: 'asCurator',
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
