import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  ensureCurator,
  linkMeetingToCurator,
  ensureGroup,
  linkMeetingToGroup,
  ensureStudent,
  linkMeetingToStudents,
} from '../../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type Mutation {
      createMeeting(input: createMeetingInput!): createMeetingPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        date?: Date;
        curator?: object /*Curator*/;
        group?: object /*Group*/;
        students?: object /*Student*/[];
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('createMeeting');
      let create = context.connectors.Meeting.getPayload(args, false);

      let result = await context.connectors.Meeting.create(create);

      if (context.pubsub) {
        context.pubsub.publish('Meeting', {
          Meeting: {
            mutation: 'CREATE',
            node: result,
            previous: null,
            updatedFields: [],
            payload: args,
          },
        });
      }

      let meetingEdge = {
        cursor: result.id,
        node: result,
      };

      let resActions = [];
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
              return linkMeetingToCurator({
                context,
                curator,
                meeting: result,
              });
            } else {
              const err = `can't linkMeetingToCurator item not created`;
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
              create: true,
            });
            if (group) {
              return linkMeetingToGroup({
                context,
                group,
                meeting: result,
              });
            } else {
              const err = `can't linkMeetingToGroup item not created`;
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
                const err = `can't linkMeetingToStudents item not created`;
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
        meeting: meetingEdge,
      };
    },
  ),
});
