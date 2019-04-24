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
      addToPersonHasManyPhones(
        input: addToPersonHasManyPhonesInput
      ): addToPersonHasManyPhonesPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        person?: string;
        phone?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('addToPersonHasManyPhones');
      let person = args.person;
      let phone = args.phone;
      let payload = {
        person,
        phone,
      };

      await context.connectors.Person.addToPhones(payload);

      let source = await context.connectors.Person.findOneById(person);

      if (context.pubsub) {
        context.pubsub.publish('Person', {
          Person: {
            mutation: 'LINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                person: args.person,
                phone: args.phone,
              },
              relation: 'phones',
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
