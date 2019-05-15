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
    extend type RootMutation {
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
      const needCommit = await context.connectors.ensureTransaction();
      const txn = await context.connectors.transaction;
      logger.trace('createMeeting');
      try {
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
              return linkMeetingToCurator({
                context,
                curator,
                meeting: result,
              });
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
              return linkMeetingToGroup({
                context,
                group,
                meeting: result,
              });
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
                return linkMeetingToStudents({
                  context,
                  students,
                  meeting: result,
                  present: $item.present,
                  specialNotes: $item.specialNotes,
                  superpuper: $item.superpuper,
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
            meeting: meetingEdge,
          }));
        } else {
          return {
            meeting: meetingEdge,
          };
        }
      } catch (e) {
        await txn.abort();
        throw e;
      }
    },
  ),
});
