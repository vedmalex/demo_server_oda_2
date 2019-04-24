import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  ensureCourse,
  linkGroupToCourse,
  ensureStudent,
  linkGroupToStudents,
  ensureCurator,
  linkGroupToCurator,
} from '../../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      createGroup(input: createGroupInput!): createGroupPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        name?: string;
        course?: object /*Course*/;
        students?: object /*Student*/[];
        curator?: object /*Curator*/;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('createGroup');
      let create = context.connectors.Group.getPayload(args, false);

      let result = await context.connectors.Group.create(create);

      if (context.pubsub) {
        context.pubsub.publish('Group', {
          Group: {
            mutation: 'CREATE',
            node: result,
            previous: null,
            updatedFields: [],
            payload: args,
          },
        });
      }

      let groupEdge = {
        cursor: result.id,
        node: result,
      };

      if (args.course) {
        let $item = args.course as { id };
        if ($item) {
          let course = await ensureCourse({
            args: $item,
            context,
            create: true,
          });
          await linkGroupToCourse({
            context,
            course,
            group: result,
          });
        }
      }

      if (
        args.students &&
        Array.isArray(args.students) &&
        args.students.length > 0
      ) {
        for (let i = 0, len = args.students.length; i < len; i++) {
          let $item = args.students[i] as { id };
          if ($item) {
            let students = await ensureStudent({
              args: $item,
              context,
              create: true,
            });
            await linkGroupToStudents({
              context,
              students,
              group: result,
            });
          }
        }
      }

      if (args.curator) {
        let $item = args.curator as { id };
        if ($item) {
          let curator = await ensureCurator({
            args: $item,
            context,
            create: true,
          });
          await linkGroupToCurator({
            context,
            curator,
            group: result,
          });
        }
      }

      return {
        group: groupEdge,
      };
    },
  ),
});
