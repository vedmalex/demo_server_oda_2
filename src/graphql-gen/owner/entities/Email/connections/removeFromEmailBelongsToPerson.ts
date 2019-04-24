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
      removeFromEmailBelongsToPerson(
        input: removeFromEmailBelongsToPersonInput
      ): removeFromEmailBelongsToPersonPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        email?: string;
        person?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('removeFromEmailBelongsToPerson');
      let email = args.email;
      let person = args.person;
      let payload = {
        email,
        person,
      };
      await context.connectors.Email.removeFromPerson(payload);

      let source = await context.connectors.Email.findOneById(email);

      if (context.pubsub) {
        context.pubsub.publish('Email', {
          Email: {
            mutation: 'UNLINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                email: args.email,
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
                email: args.email,
                person: args.person,
              },
              relation: 'emails',
            },
          },
        });
      }

      return {
        email: source,
      };
    },
  ),
});
