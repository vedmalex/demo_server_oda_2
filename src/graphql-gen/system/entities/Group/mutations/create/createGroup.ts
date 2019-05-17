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
    extend type Mutation {
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

      let resActions = [];
      if (args.course) {
        let $item = args.course as { id };
        if ($item) {
          resActions.push(async () => {
            let course = await ensureCourse({
              args: $item,
              context,
              create: true,
            });
            if (course) {
              return linkGroupToCourse({
                context,
                course,
                group: result,
              });
            } else {
              const err = `can't linkGroupToCourse item not created`;
              logger.error(err);
              throw new Error(err);
            }
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
            resActions.push(async () => {
              let students = await ensureStudent({
                args: $item,
                context,
                create: true,
              });
              if (students) {
                return linkGroupToStudents({
                  context,
                  students,
                  group: result,
                });
              } else {
                const err = `can't linkGroupToStudents item not created`;
                logger.error(err);
                throw new Error(err);
              }
            });
          }
        }
      }
      if (args.curator) {
        let $item = args.curator as { id };
        if ($item) {
          resActions.push(async () => {
            let curator = await ensureCurator({
              args: $item,
              context,
              create: true,
            });
            if (curator) {
              return linkGroupToCurator({
                context,
                curator,
                group: result,
              });
            } else {
              const err = `can't linkGroupToCurator item not created`;
              logger.error(err);
              throw new Error(err);
            }
          });
        }
      }
      if (resActions.length > 0) {
        await Promise.all(resActions);
      }

      return {
        group: groupEdge,
      };
    },
  ),
});
