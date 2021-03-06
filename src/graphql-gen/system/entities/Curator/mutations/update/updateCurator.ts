import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  ensurePerson,
  unlinkCuratorFromPerson,
  linkCuratorToPerson,
  ensureGroup,
  unlinkCuratorFromGroups,
  linkCuratorToGroups,
} from '../../../../common';
import gql from 'graphql-tag';
import { merge } from 'lodash';

export default new Mutation({
  schema: gql`
    extend type Mutation {
      updateCurator(input: updateCuratorInput!): updateCuratorPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        person?: object /*Person*/;
        personUnlink?: object /*Person*/;
        personCreate?: object /*Person*/;
        groups?: object /*Group*/[];
        groupsUnlink?: object /*Group*/[];
        groupsCreate?: object /*Group*/[];
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('updateCurator');
      let payload = context.connectors.Curator.getPayload(args);

      let result;
      let previous;

      if (args.id) {
        previous = await context.connectors.Curator.findOneById(args.id);
        result = await context.connectors.Curator.findOneByIdAndUpdate(
          args.id,
          merge({}, previous, payload),
        );
      }

      if (!result) {
        throw new Error('item of type Curator is not found for update');
      }

      if (context.pubsub) {
        context.pubsub.publish('Curator', {
          Curator: {
            mutation: 'UPDATE',
            node: result,
            previous,
            updatedFields: Object.keys(payload).filter(
              f => payload[f] !== undefined,
            ),
            payload: args,
          },
        });
      }

      let resActions = [];
      if (args.personUnlink) {
        let $item = args.personUnlink;
        if ($item) {
          resActions.push(async () => {
            let person = await ensurePerson({
              args: $item,
              context,
              create: false,
            });
            if (person) {
              return unlinkCuratorFromPerson({
                context,
                person,
                curator: result,
              });
            } else {
              const err = `can't unlinkCuratorToPerson item not found`;
              logger.error(err);
              throw new Error(err);
            }
          });
        }
      }

      if (args.personCreate) {
        let $item = args.personCreate as { id };
        if ($item) {
          resActions.push(async () => {
            let person = await ensurePerson({
              args: $item,
              context,
              create: true,
            });

            if (person) {
              return linkCuratorToPerson({
                context,
                person,
                curator: result,
              });
            } else {
              const err = `can't linkCuratorToPerson item not found`;
              logger.error(err);
              throw new Error(err);
            }
          });
        }
      }

      if (args.person) {
        let $item = args.person as { id };
        if ($item) {
          resActions.push(async () => {
            let person = await ensurePerson({
              args: $item,
              context,
              create: false,
            });

            if (person) {
              return linkCuratorToPerson({
                context,
                person,
                curator: result,
              });
            } else {
              const err = `can't linkCuratorToPerson item not found`;
              logger.error(err);
              throw new Error(err);
            }
          });
        }
      }

      if (
        args.groupsUnlink &&
        Array.isArray(args.groupsUnlink) &&
        args.groupsUnlink.length > 0
      ) {
        for (let i = 0, len = args.groupsUnlink.length; i < len; i++) {
          let $item = args.groupsUnlink[i];
          if ($item) {
            resActions.push(async () => {
              let groups = await ensureGroup({
                args: $item,
                context,
                create: false,
              });
              if (groups) {
                return unlinkCuratorFromGroups({
                  context,
                  groups,
                  curator: result,
                });
              } else {
                const err = `can't unlinkCuratorToGroups item not found`;
                logger.error(err);
                throw new Error(err);
              }
            });
          }
        }
      }

      if (
        args.groupsCreate &&
        Array.isArray(args.groupsCreate) &&
        args.groupsCreate.length > 0
      ) {
        for (let i = 0, len = args.groupsCreate.length; i < len; i++) {
          let $item = args.groupsCreate[i] as { id };
          if ($item) {
            resActions.push(async () => {
              let groups = await ensureGroup({
                args: $item,
                context,
                create: true,
              });

              if (groups) {
                return linkCuratorToGroups({
                  context,
                  groups,
                  curator: result,
                });
              } else {
                const err = `can't linkCuratorToGroups item not found`;
                logger.error(err);
                throw new Error(err);
              }
            });
          }
        }
      }

      if (args.groups && Array.isArray(args.groups) && args.groups.length > 0) {
        for (let i = 0, len = args.groups.length; i < len; i++) {
          let $item = args.groups[i] as { id };
          if ($item) {
            resActions.push(async () => {
              let groups = await ensureGroup({
                args: $item,
                context,
                create: false,
              });

              if (groups) {
                return linkCuratorToGroups({
                  context,
                  groups,
                  curator: result,
                });
              } else {
                const err = `can't linkCuratorToGroups item not found`;
                logger.error(err);
                throw new Error(err);
              }
            });
          }
        }
      }

      if (resActions.length > 0) {
        await Promise.all(resActions);
      }
      return {
        curator: result,
      };
    },
  ),
});
