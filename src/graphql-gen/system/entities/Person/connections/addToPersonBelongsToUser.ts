import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
} from '../../../common';
import gql from 'graphql-tag';
import { PartialSocialNetwork } from '../../../data/SocialNetwork/types/model';
import { PartialPhone } from '../../../data/Phone/types/model';
import { PartialEmail } from '../../../data/Email/types/model';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      addToPersonBelongsToUser(
        input: addToPersonBelongsToUserInput
      ): addToPersonBelongsToUserPayload
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
      logger.trace('addToPersonBelongsToUser');
      let person = args.person;
      let user = args.user;
      let payload = {
        person,
        user,
      };

      await context.connectors.Person.addToUser(payload);

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
