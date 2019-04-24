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
    extend type RootMutation {
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

      if (args.meetingLink) {
        let $item = args.meetingLink as { id };
        if ($item) {
          let meetingLink = await ensureMeeting({
            args: $item,
            context,
            create: true,
          });
          await linkStudentAttendanceToMeetingLink({
            context,
            meetingLink,
            studentAttendance: result,
          });
        }
      }

      if (args.studentLink) {
        let $item = args.studentLink as { id };
        if ($item) {
          let studentLink = await ensureStudent({
            args: $item,
            context,
            create: true,
          });
          await linkStudentAttendanceToStudentLink({
            context,
            studentLink,
            studentAttendance: result,
          });
        }
      }

      return {
        studentAttendance: studentAttendanceEdge,
      };
    },
  ),
});
