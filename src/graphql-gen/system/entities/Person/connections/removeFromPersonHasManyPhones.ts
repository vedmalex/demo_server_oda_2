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
      removeFromPersonHasManyPhones(
        input: removeFromPersonHasManyPhonesInput
      ): removeFromPersonHasManyPhonesPayload
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
      logger.trace('removeFromPersonHasManyPhones');
      let person = args.person;
      let phone = args.phone;
      let payload = {
        person,
        phone,
      };
      await context.connectors.Person.removeFromPhones(payload);

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
