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
    extend type RootMutation {
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

      if (args.personUnlink) {
        let $item = args.personUnlink;
        if ($item) {
          let person = await ensurePerson({
            args: $item,
            context,
            create: false,
          });
          await unlinkCuratorFromPerson({
            context,
            person,
            curator: result,
          });
        }
      }

      if (args.personCreate) {
        let $item = args.personCreate as { id };
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

      if (args.person) {
        let $item = args.person as { id };
        if ($item) {
          let person = await ensurePerson({
            args: $item,
            context,
            create: false,
          });

          await linkCuratorToPerson({
            context,
            person,
            curator: result,
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
            let groups = await ensureGroup({
              args: $item,
              context,
              create: false,
            });
            await unlinkCuratorFromGroups({
              context,
              groups,
              curator: result,
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

      if (args.groups && Array.isArray(args.groups) && args.groups.length > 0) {
        for (let i = 0, len = args.groups.length; i < len; i++) {
          let $item = args.groups[i] as { id };
          if ($item) {
            let groups = await ensureGroup({
              args: $item,
              context,
              create: false,
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
        curator: result,
      };
    },
  ),
});
