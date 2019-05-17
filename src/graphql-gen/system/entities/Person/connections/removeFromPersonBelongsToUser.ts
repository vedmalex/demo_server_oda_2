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
      removeFromPersonBelongsToUser(
        input: removeFromPersonBelongsToUserInput
      ): removeFromPersonBelongsToUserPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        person?: string;
        user?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('removeFromPersonBelongsToUser');
      let person = args.person;
      let user = args.user;
      let payload = {
        person,
        user,
      };
      await context.connectors.Person.removeFromUser(payload);

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
                user: args.user,
              },
              relation: 'user',
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
