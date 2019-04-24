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
      addToEmailBelongsToPerson(
        input: addToEmailBelongsToPersonInput
      ): addToEmailBelongsToPersonPayload
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
      logger.trace('addToEmailBelongsToPerson');
      let email = args.email;
      let person = args.person;
      let payload = {
        email,
        person,
      };

      await context.connectors.Email.addToPerson(payload);

      let source = await context.connectors.Email.findOneById(email);

      if (context.pubsub) {
        context.pubsub.publish('Email', {
          Email: {
            mutation: 'LINK',
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
            mutation: 'LINK',
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
