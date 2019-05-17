import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  ensureMeeting,
  linkStudentAttendanceToMeetingLink,
  ensureStudent,
  linkStudentAttendanceToStudentLink,
} from '../../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type Mutation {
      createStudentAttendance(
        input: createStudentAttendanceInput!
      ): createStudentAttendancePayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        meeting?: string;
        student?: string;
        present?: boolean;
        specialNotes?: string;
        superpuper?: string;
        meetingLink?: object /*Meeting*/;
        studentLink?: object /*Student*/;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('createStudentAttendance');
      let create = context.connectors.StudentAttendance.getPayload(args, false);

      let result = await context.connectors.StudentAttendance.create(create);

      if (context.pubsub) {
        context.pubsub.publish('StudentAttendance', {
          StudentAttendance: {
            mutation: 'CREATE',
            node: result,
            previous: null,
            updatedFields: [],
            payload: args,
          },
        });
      }

      let studentAttendanceEdge = {
        cursor: result.id,
        node: result,
      };

      let resActions = [];
      if (args.meetingLink) {
        let $item = args.meetingLink as { id };
        if ($item) {
          resActions.push(async () => {
            let meetingLink = await ensureMeeting({
              args: $item,
              context,
              create: true,
            });
            if (meetingLink) {
              return linkStudentAttendanceToMeetingLink({
                context,
                meetingLink,
                studentAttendance: result,
              });
            } else {
              const err = `can't linkStudentAttendanceToMeetingLink item not created`;
              logger.error(err);
              throw new Error(err);
            }
          });
        }
      }
      if (args.studentLink) {
        let $item = args.studentLink as { id };
        if ($item) {
          resActions.push(async () => {
            let studentLink = await ensureStudent({
              args: $item,
              context,
              create: true,
            });
            if (studentLink) {
              return linkStudentAttendanceToStudentLink({
                context,
                studentLink,
                studentAttendance: result,
              });
            } else {
              const err = `can't linkStudentAttendanceToStudentLink item not created`;
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
        studentAttendance: studentAttendanceEdge,
      };
    },
  ),
});
