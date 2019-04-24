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
      addToGroupBelongsToCurator(
        input: addToGroupBelongsToCuratorInput
      ): addToGroupBelongsToCuratorPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        group?: string;
        curator?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('addToGroupBelongsToCurator');
      let group = args.group;
      let curator = args.curator;
      let payload = {
        group,
        curator,
      };

      await context.connectors.Group.addToCurator(payload);

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
                curator: args.curator,
              },
              relation: 'curator',
            },
          },
        });

        let dest = await context.connectors.Curator.findOneById(curator);

        context.pubsub.publish('Curator', {
          Curator: {
            mutation: 'LINK',
            node: dest,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                group: args.group,
                curator: args.curator,
              },
              relation: 'groups',
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
