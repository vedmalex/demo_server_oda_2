import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  ensureCourse,
  unlinkGroupFromCourse,
  linkGroupToCourse,
  ensureStudent,
  unlinkGroupFromStudents,
  linkGroupToStudents,
  ensureCurator,
  unlinkGroupFromCurator,
  linkGroupToCurator,
} from '../../../../common';
import gql from 'graphql-tag';
import { merge } from 'lodash';

export default new Mutation({
  schema: gql`
    extend type Mutation {
      updateGroup(input: updateGroupInput!): updateGroupPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        name?: string;
        course?: object /*Course*/;
        courseUnlink?: object /*Course*/;
        courseCreate?: object /*Course*/;
        students?: object /*Student*/[];
        studentsUnlink?: object /*Student*/[];
        studentsCreate?: object /*Student*/[];
        curator?: object /*Curator*/;
        curatorUnlink?: object /*Curator*/;
        curatorCreate?: object /*Curator*/;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('updateGroup');
      let payload = context.connectors.Group.getPayload(args);

      let result;
      let previous;

      if (args.id) {
        previous = await context.connectors.Group.findOneById(args.id);
        result = await context.connectors.Group.findOneByIdAndUpdate(
          args.id,
          merge({}, previous, payload),
        );
      } else if (args.name) {
        delete payload.name;
        previous = await context.connectors.Group.findOneByName(args.name);
        result = await context.connectors.Group.findOneByNameAndUpdate(
          args.name,
          merge({}, previous, payload),
        );
      }

      if (!result) {
        throw new Error('item of type Group is not found for update');
      }

      if (context.pubsub) {
        context.pubsub.publish('Group', {
          Group: {
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
      if (args.courseUnlink) {
        let $item = args.courseUnlink;
        if ($item) {
          resActions.push(async () => {
            let course = await ensureCourse({
              args: $item,
              context,
              create: false,
            });
            if (course) {
              return unlinkGroupFromCourse({
                context,
                course,
                group: result,
              });
            } else {
              const err = `can't unlinkGroupToCourse item not found`;
              logger.error(err);
              throw new Error(err);
            }
          });
        }
      }

      if (args.courseCreate) {
        let $item = args.courseCreate as { id };
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
              const err = `can't linkGroupToCourse item not found`;
              logger.error(err);
              throw new Error(err);
            }
          });
        }
      }

      if (args.course) {
        let $item = args.course as { id };
        if ($item) {
          resActions.push(async () => {
            let course = await ensureCourse({
              args: $item,
              context,
              create: false,
            });

            if (course) {
              return linkGroupToCourse({
                context,
                course,
                group: result,
              });
            } else {
              const err = `can't linkGroupToCourse item not found`;
              logger.error(err);
              throw new Error(err);
            }
          });
        }
      }

      if (
        args.studentsUnlink &&
        Array.isArray(args.studentsUnlink) &&
        args.studentsUnlink.length > 0
      ) {
        for (let i = 0, len = args.studentsUnlink.length; i < len; i++) {
          let $item = args.studentsUnlink[i];
          if ($item) {
            resActions.push(async () => {
              let students = await ensureStudent({
                args: $item,
                context,
                create: false,
              });
              if (students) {
                return unlinkGroupFromStudents({
                  context,
                  students,
                  group: result,
                });
              } else {
                const err = `can't unlinkGroupToStudents item not found`;
                logger.error(err);
                throw new Error(err);
              }
            });
          }
        }
      }

      if (
        args.studentsCreate &&
        Array.isArray(args.studentsCreate) &&
        args.studentsCreate.length > 0
      ) {
        for (let i = 0, len = args.studentsCreate.length; i < len; i++) {
          let $item = args.studentsCreate[i] as { id };
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
                const err = `can't linkGroupToStudents item not found`;
                logger.error(err);
                throw new Error(err);
              }
            });
          }
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
                create: false,
              });

              if (students) {
                return linkGroupToStudents({
                  context,
                  students,
                  group: result,
                });
              } else {
                const err = `can't linkGroupToStudents item not found`;
                logger.error(err);
                throw new Error(err);
              }
            });
          }
        }
      }

      if (args.curatorUnlink) {
        let $item = args.curatorUnlink;
        if ($item) {
          resActions.push(async () => {
            let curator = await ensureCurator({
              args: $item,
              context,
              create: false,
            });
            if (curator) {
              return unlinkGroupFromCurator({
                context,
                curator,
                group: result,
              });
            } else {
              const err = `can't unlinkGroupToCurator item not found`;
              logger.error(err);
              throw new Error(err);
            }
          });
        }
      }

      if (args.curatorCreate) {
        let $item = args.curatorCreate as { id };
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
              const err = `can't linkGroupToCurator item not found`;
              logger.error(err);
              throw new Error(err);
            }
          });
        }
      }

      if (args.curator) {
        let $item = args.curator as { id };
        if ($item) {
          resActions.push(async () => {
            let curator = await ensureCurator({
              args: $item,
              context,
              create: false,
            });

            if (curator) {
              return linkGroupToCurator({
                context,
                curator,
                group: result,
              });
            } else {
              const err = `can't linkGroupToCurator item not found`;
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
        group: result,
      };
    },
  ),
});
