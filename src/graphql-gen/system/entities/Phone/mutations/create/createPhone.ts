import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  ensureUser,
  linkPhoneToCreatedBy,
  linkPhoneToUpdateBy,
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

      if (args.createdBy) {
        let $item = args.createdBy as { id };
        if ($item) {
          let createdBy = await ensureUser({
            args: $item,
            context,
            create: true,
          });
          await linkPhoneToCreatedBy({
            context,
            createdBy,
            phone: result,
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
          await linkPhoneToUpdateBy({
            context,
            updateBy,
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
