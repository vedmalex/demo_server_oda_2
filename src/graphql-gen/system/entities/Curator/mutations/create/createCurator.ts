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
      const needCommit = await context.connectors.ensureTransaction();
      const txn = await context.connectors.transaction;
      logger.trace('createCurator');
      try {
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

        let resActions = [];
        if (args.person) {
          let $item = args.person as { id };
          if ($item) {
            resActions.push(async () => {
              let person = await ensurePerson({
                args: $item,
                context,
                create: true,
              });
              return linkCuratorToPerson({
                context,
                person,
                curator: result,
              });
            });
          }
        }
        if (
          args.groups &&
          Array.isArray(args.groups) &&
          args.groups.length > 0
        ) {
          for (let i = 0, len = args.groups.length; i < len; i++) {
            let $item = args.groups[i] as { id };
            if ($item) {
              resActions.push(async () => {
                let groups = await ensureGroup({
                  args: $item,
                  context,
                  create: true,
                });
                return linkCuratorToGroups({
                  context,
                  groups,
                  curator: result,
                });
              });
            }
          }
        }
        if (resActions.length > 0) {
          await Promise.all(resActions);
        }
        if (needCommit) {
          return txn.commit().then(() => ({
            curator: curatorEdge,
          }));
        } else {
          return {
            curator: curatorEdge,
          };
        }
      } catch (e) {
        await txn.abort();
        throw e;
      }
    },
  ),
});
