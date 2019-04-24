import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  ensurePerson,
  linkPhoneToPerson,
} from '../../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      createPhone(input: createPhoneInput!): createPhonePayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        phoneNumber?: string;
        type?: string;
        person?: object /*Person*/;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('createPhone');
      let create = context.connectors.Phone.getPayload(args, false);

      let result = await context.connectors.Phone.create(create);

      if (context.pubsub) {
        context.pubsub.publish('Phone', {
          Phone: {
            mutation: 'CREATE',
            node: result,
            previous: null,
            updatedFields: [],
            payload: args,
          },
        });
      }

      let phoneEdge = {
        cursor: result.id,
        node: result,
      };

      if (args.person) {
        let $item = args.person as { id };
        if ($item) {
          let person = await ensurePerson({
            args: $item,
            context,
            create: true,
          });
          await linkPhoneToPerson({
            context,
            person,
            phone: result,
          });
        }
      }

      return {
        phone: phoneEdge,
      };
    },
  ),
});
