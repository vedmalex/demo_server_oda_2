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
      removeFromPersonHasManyEmails(
        input: removeFromPersonHasManyEmailsInput
      ): removeFromPersonHasManyEmailsPayload
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
      logger.trace('removeFromPersonHasManyEmails');
      let person = args.person;
      let email = args.email;
      let payload = {
        person,
        email,
      };
      await context.connectors.Person.removeFromEmails(payload);

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
