import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  ensureMeeting,
  unlinkStudentAttendanceFromMeetingLink,
  linkStudentAttendanceToMeetingLink,
  ensureStudent,
  unlinkStudentAttendanceFromStudentLink,
  linkStudentAttendanceToStudentLink,
} from '../../../../common';
import gql from 'graphql-tag';
import { merge } from 'lodash';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      updateStudentAttendance(
        input: updateStudentAttendanceInput!
      ): updateStudentAttendancePayload
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
        meetingLinkUnlink?: object /*Meeting*/;
        meetingLinkCreate?: object /*Meeting*/;
        studentLink?: object /*Student*/;
        studentLinkUnlink?: object /*Student*/;
        studentLinkCreate?: object /*Student*/;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('updateStudentAttendance');
      let payload = context.connectors.StudentAttendance.getPayload(args);

      let result;
      let previous;

      if (args.id) {
        previous = await context.connectors.StudentAttendance.findOneById(
          args.id,
        );
        result = await context.connectors.StudentAttendance.findOneByIdAndUpdate(
          args.id,
          merge({}, previous, payload),
        );
      }

      if (!result) {
        throw new Error(
          'item of type StudentAttendance is not found for update',
        );
      }

      if (context.pubsub) {
        context.pubsub.publish('StudentAttendance', {
          StudentAttendance: {
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

      if (args.meetingLinkUnlink) {
        let $item = args.meetingLinkUnlink;
        if ($item) {
          let meetingLink = await ensureMeeting({
            args: $item,
            context,
            create: false,
          });
          await unlinkStudentAttendanceFromMeetingLink({
            context,
            meetingLink,
            studentAttendance: result,
          });
        }
      }

      if (args.meetingLinkCreate) {
        let $item = args.meetingLinkCreate as { id };
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

      if (args.meetingLink) {
        let $item = args.meetingLink as { id };
        if ($item) {
          let meetingLink = await ensureMeeting({
            args: $item,
            context,
            create: false,
          });

          await linkStudentAttendanceToMeetingLink({
            context,
            meetingLink,
            studentAttendance: result,
          });
        }
      }

      if (args.studentLinkUnlink) {
        let $item = args.studentLinkUnlink;
        if ($item) {
          let studentLink = await ensureStudent({
            args: $item,
            context,
            create: false,
          });
          await unlinkStudentAttendanceFromStudentLink({
            context,
            studentLink,
            studentAttendance: result,
          });
        }
      }

      if (args.studentLinkCreate) {
        let $item = args.studentLinkCreate as { id };
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

      if (args.studentLink) {
        let $item = args.studentLink as { id };
        if ($item) {
          let studentLink = await ensureStudent({
            args: $item,
            context,
            create: false,
          });

          await linkStudentAttendanceToStudentLink({
            context,
            studentLink,
            studentAttendance: result,
          });
        }
      }

      return {
        studentAttendance: result,
      };
    },
  ),
});
