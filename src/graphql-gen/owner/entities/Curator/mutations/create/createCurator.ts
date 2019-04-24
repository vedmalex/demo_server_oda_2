import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  ensurePerson,
  linkCuratorToPerson,
  ensureGroup,
  linkCuratorToGroups,
} from '../../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      createCurator(input: createCuratorInput!): createCuratorPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        person?: object /*Person*/;
        groups?: object /*Group*/[];
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('createCurator');
      let create = context.connectors.Curator.getPayload(args, false);

      let result = await context.connectors.Curator.create(create);

      if (context.pubsub) {
        context.pubsub.publish('Curator', {
          Curator: {
            mutation: 'CREATE',
            node: result,
            previous: null,
            updatedFields: [],
            payload: args,
          },
        });
      }

      let curatorEdge = {
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
          await linkCuratorToPerson({
            context,
            person,
            curator: result,
          });
        }
      }

      if (args.groups && Array.isArray(args.groups) && args.groups.length > 0) {
        for (let i = 0, len = args.groups.length; i < len; i++) {
          let $item = args.groups[i] as { id };
          if ($item) {
            let groups = await ensureGroup({
              args: $item,
              context,
              create: true,
            });
            await linkCuratorToGroups({
              context,
              groups,
              curator: result,
            });
          }
        }
      }

      return {
        curator: curatorEdge,
      };
    },
  ),
});
