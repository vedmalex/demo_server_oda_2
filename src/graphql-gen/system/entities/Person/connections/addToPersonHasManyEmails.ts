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
      addToPersonHasManyEmails(
        input: addToPersonHasManyEmailsInput
      ): addToPersonHasManyEmailsPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        person?: string;
        email?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('addToPersonHasManyEmails');
      let person = args.person;
      let email = args.email;
      let payload = {
        person,
        email,
      };

      await context.connectors.Person.addToEmails(payload);

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
                email: args.email,
              },
              relation: 'emails',
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
