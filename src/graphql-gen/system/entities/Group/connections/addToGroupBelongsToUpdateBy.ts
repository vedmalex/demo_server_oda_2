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
      addToGroupBelongsToUpdateBy(
        input: addToGroupBelongsToUpdateByInput
      ): addToGroupBelongsToUpdateByPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        group?: string;
        user?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('addToGroupBelongsToUpdateBy');
      let group = args.group;
      let user = args.user;
      let payload = {
        group,
        user,
      };

      await context.connectors.Group.addToUpdateBy(payload);

      let source = await context.connectors.Group.findOneById(group);

      if (context.pubsub) {
        context.pubsub.publish('Group', {
          Group: {
            mutation: 'LINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                group: args.group,
                user: args.user,
              },
              relation: 'updateBy',
            },
          },
        });
      }
      return {
        group: source,
      };
    },
  ),
});
