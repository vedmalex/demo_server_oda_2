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
      addToPersonBelongsToCreatedBy(
        input: addToPersonBelongsToCreatedByInput
      ): addToPersonBelongsToCreatedByPayload
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
      logger.trace('addToPersonBelongsToCreatedBy');
      let person = args.person;
      let user = args.user;
      let payload = {
        person,
        user,
      };

      await context.connectors.Person.addToCreatedBy(payload);

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
                user: args.user,
              },
              relation: 'createdBy',
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
