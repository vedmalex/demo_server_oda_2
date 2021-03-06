import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  ensureCurator,
  unlinkMeetingFromCurator,
  linkMeetingToCurator,
  ensureGroup,
  unlinkMeetingFromGroup,
  linkMeetingToGroup,
  ensureStudent,
  unlinkMeetingFromStudents,
  linkMeetingToStudents,
} from '../../../../common';
import gql from 'graphql-tag';
import { merge } from 'lodash';

export default new Mutation({
  schema: gql`
    extend type Mutation {
      updateMeeting(input: updateMeetingInput!): updateMeetingPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        date?: Date;
        curator?: object /*Curator*/;
        curatorUnlink?: object /*Curator*/;
        curatorCreate?: object /*Curator*/;
        group?: object /*Group*/;
        groupUnlink?: object /*Group*/;
        groupCreate?: object /*Group*/;
        students?: object /*Student*/[];
        studentsUnlink?: object /*Student*/[];
        studentsCreate?: object /*Student*/[];
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('updateMeeting');
      let payload = context.connectors.Meeting.getPayload(args);

      let result;
      let previous;

      if (args.id) {
        previous = await context.connectors.Meeting.findOneById(args.id);
        result = await context.connectors.Meeting.findOneByIdAndUpdate(
          args.id,
          merge({}, previous, payload),
        );
      }

      if (!result) {
        throw new Error('item of type Meeting is not found for update');
      }

      if (context.pubsub) {
        context.pubsub.publish('Meeting', {
          Meeting: {
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
              return unlinkMeetingFromCurator({
                context,
                curator,
                meeting: result,
              });
            } else {
              const err = `can't unlinkMeetingToCurator item not found`;
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
              return linkMeetingToCurator({
                context,
                curator,
                meeting: result,
              });
            } else {
              const err = `can't linkMeetingToCurator item not found`;
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
              return linkMeetingToCurator({
                context,
                curator,
                meeting: result,
              });
            } else {
              const err = `can't linkMeetingToCurator item not found`;
              logger.error(err);
              throw new Error(err);
            }
          });
        }
      }

      if (args.groupUnlink) {
        let $item = args.groupUnlink;
        if ($item) {
          resActions.push(async () => {
            let group = await ensureGroup({
              args: $item,
              context,
              create: false,
            });
            if (group) {
              return unlinkMeetingFromGroup({
                context,
                group,
                meeting: result,
              });
            } else {
              const err = `can't unlinkMeetingToGroup item not found`;
              logger.error(err);
              throw new Error(err);
            }
          });
        }
      }

      if (args.groupCreate) {
        let $item = args.groupCreate as { id };
        if ($item) {
          resActions.push(async () => {
            let group = await ensureGroup({
              args: $item,
              context,
              create: true,
            });

            if (group) {
              return linkMeetingToGroup({
                context,
                group,
                meeting: result,
              });
            } else {
              const err = `can't linkMeetingToGroup item not found`;
              logger.error(err);
              throw new Error(err);
            }
          });
        }
      }

      if (args.group) {
        let $item = args.group as { id };
        if ($item) {
          resActions.push(async () => {
            let group = await ensureGroup({
              args: $item,
              context,
              create: false,
            });

            if (group) {
              return linkMeetingToGroup({
                context,
                group,
                meeting: result,
              });
            } else {
              const err = `can't linkMeetingToGroup item not found`;
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
                return unlinkMeetingFromStudents({
                  context,
                  students,
                  meeting: result,
                });
              } else {
                const err = `can't unlinkMeetingToStudents item not found`;
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
          let $item = args.studentsCreate[i] as {
            id;
            present;
            specialNotes;
            superpuper;
          };
          if ($item) {
            resActions.push(async () => {
              let students = await ensureStudent({
                args: $item,
                context,
                create: true,
              });

              if (students) {
                return linkMeetingToStudents({
                  context,
                  students,
                  meeting: result,
                  present: $item.present,
                  specialNotes: $item.specialNotes,
                  superpuper: $item.superpuper,
                });
              } else {
                const err = `can't linkMeetingToStudents item not found`;
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
          let $item = args.students[i] as {
            id;
            present;
            specialNotes;
            superpuper;
          };
          if ($item) {
            resActions.push(async () => {
              let students = await ensureStudent({
                args: $item,
                context,
                create: false,
              });

              if (students) {
                return linkMeetingToStudents({
                  context,
                  students,
                  meeting: result,
                  present: $item.present,
                  specialNotes: $item.specialNotes,
                  superpuper: $item.superpuper,
                });
              } else {
                const err = `can't linkMeetingToStudents item not found`;
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
        meeting: result,
      };
    },
  ),
});
