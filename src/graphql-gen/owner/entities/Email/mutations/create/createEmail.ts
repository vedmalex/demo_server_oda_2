import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  ensurePerson,
  linkEmailToPerson,
} from '../../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      createEmail(input: createEmailInput!): createEmailPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        email?: string;
        type?: string;
        person?: object /*Person*/;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('createEmail');
      let create = context.connectors.Email.getPayload(args, false);

      let result = await context.connectors.Email.create(create);

      if (context.pubsub) {
        context.pubsub.publish('Email', {
          Email: {
            mutation: 'CREATE',
            node: result,
            previous: null,
            updatedFields: [],
            payload: args,
          },
        });
      }

      let emailEdge = {
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
          await linkEmailToPerson({
            context,
            person,
            email: result,
          });
        }
      }

      return {
        email: emailEdge,
      };
    },
  ),
});
