import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  ensureUser,
  linkEmailToCreatedBy,
  linkEmailToUpdateBy,
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
        createdAt?: Date;
        updatedAt?: Date;
        removed?: boolean;
        owner?: string;
        createdBy?: object /*User*/;
        updateBy?: object /*User*/;
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

      if (args.createdBy) {
        let $item = args.createdBy as { id };
        if ($item) {
          let createdBy = await ensureUser({
            args: $item,
            context,
            create: true,
          });
          await linkEmailToCreatedBy({
            context,
            createdBy,
            email: result,
          });
        }
      }

      if (args.updateBy) {
        let $item = args.updateBy as { id };
        if ($item) {
          let updateBy = await ensureUser({
            args: $item,
            context,
            create: true,
          });
          await linkEmailToUpdateBy({
            context,
            updateBy,
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
