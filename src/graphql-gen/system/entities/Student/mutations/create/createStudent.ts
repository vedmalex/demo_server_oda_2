import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  ensurePerson,
  linkStudentToPerson,
  ensureGroup,
  linkStudentToGroup,
  ensureMeeting,
  linkStudentToMeetings,
} from '../../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      createStudent(input: createStudentInput!): createStudentPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        person?: object /*Person*/;
        group?: object /*Group*/;
        meetings?: object /*Meeting*/[];
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      const needCommit = await context.connectors.ensureTransaction();
      const txn = await context.connectors.transaction;
      logger.trace('createStudent');
      try {
        let create = context.connectors.Student.getPayload(args, false);

        let result = await context.connectors.Student.create(create);

        if (context.pubsub) {
          context.pubsub.publish('Student', {
            Student: {
              mutation: 'CREATE',
              node: result,
              previous: null,
              updatedFields: [],
              payload: args,
            },
          });
        }

        let studentEdge = {
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
              return linkStudentToPerson({
                context,
                person,
                student: result,
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
              return linkStudentToGroup({
                context,
                group,
                student: result,
              });
            });
          }
        }
        if (
          args.meetings &&
          Array.isArray(args.meetings) &&
          args.meetings.length > 0
        ) {
          for (let i = 0, len = args.meetings.length; i < len; i++) {
            let $item = args.meetings[i] as { id };
            if ($item) {
              resActions.push(async () => {
                let meetings = await ensureMeeting({
                  args: $item,
                  context,
                  create: true,
                });
                return linkStudentToMeetings({
                  context,
                  meetings,
                  student: result,
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
            student: studentEdge,
          }));
        } else {
          return {
            student: studentEdge,
          };
        }
      } catch (e) {
        await txn.abort();
        throw e;
      }
    },
  ),
});
