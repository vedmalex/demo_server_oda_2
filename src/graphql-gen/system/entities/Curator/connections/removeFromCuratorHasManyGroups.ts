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
      removeFromCuratorHasManyGroups(
        input: removeFromCuratorHasManyGroupsInput
      ): removeFromCuratorHasManyGroupsPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        curator?: string;
        group?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('removeFromCuratorHasManyGroups');
      let curator = args.curator;
      let group = args.group;
      let payload = {
        curator,
        group,
      };
      await context.connectors.Curator.removeFromGroups(payload);

      let source = await context.connectors.Curator.findOneById(curator);

      if (context.pubsub) {
        context.pubsub.publish('Curator', {
          Curator: {
            mutation: 'UNLINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                curator: args.curator,
                group: args.group,
              },
              relation: 'groups',
            },
          },
        });

        let dest = await context.connectors.Group.findOneById(group);

        context.pubsub.publish('Group', {
          Group: {
            mutation: 'UNLINK',
            node: dest,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                curator: args.curator,
                group: args.group,
              },
              relation: 'curator',
            },
          },
        });
      }

      return {
        curator: source,
      };
    },
  ),
});
