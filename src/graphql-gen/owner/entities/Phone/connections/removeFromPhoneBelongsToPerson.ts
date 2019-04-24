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
      removeFromPhoneBelongsToPerson(
        input: removeFromPhoneBelongsToPersonInput
      ): removeFromPhoneBelongsToPersonPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        phone?: string;
        person?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('removeFromPhoneBelongsToPerson');
      let phone = args.phone;
      let person = args.person;
      let payload = {
        phone,
        person,
      };
      await context.connectors.Phone.removeFromPerson(payload);

      let source = await context.connectors.Phone.findOneById(phone);

      if (context.pubsub) {
        context.pubsub.publish('Phone', {
          Phone: {
            mutation: 'UNLINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                phone: args.phone,
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
                phone: args.phone,
                person: args.person,
              },
              relation: 'phones',
            },
          },
        });
      }

      return {
        phone: source,
      };
    },
  ),
});
