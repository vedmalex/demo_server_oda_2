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
    extend type Mutation {
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
        superpuper?: string;
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

      let resActions = [];
      if (args.meetingLinkUnlink) {
        let $item = args.meetingLinkUnlink;
        if ($item) {
          resActions.push(async () => {
            let meetingLink = await ensureMeeting({
              args: $item,
              context,
              create: false,
            });
            if (meetingLink) {
              return unlinkStudentAttendanceFromMeetingLink({
                context,
                meetingLink,
                studentAttendance: result,
              });
            } else {
              const err = `can't unlinkStudentAttendanceToMeetingLink item not found`;
              logger.error(err);
              throw new Error(err);
            }
          });
        }
      }

      if (args.meetingLinkCreate) {
        let $item = args.meetingLinkCreate as { id };
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
              const err = `can't linkStudentAttendanceToMeetingLink item not found`;
              logger.error(err);
              throw new Error(err);
            }
          });
        }
      }

      if (args.meetingLink) {
        let $item = args.meetingLink as { id };
        if ($item) {
          resActions.push(async () => {
            let meetingLink = await ensureMeeting({
              args: $item,
              context,
              create: false,
            });

            if (meetingLink) {
              return linkStudentAttendanceToMeetingLink({
                context,
                meetingLink,
                studentAttendance: result,
              });
            } else {
              const err = `can't linkStudentAttendanceToMeetingLink item not found`;
              logger.error(err);
              throw new Error(err);
            }
          });
        }
      }

      if (args.studentLinkUnlink) {
        let $item = args.studentLinkUnlink;
        if ($item) {
          resActions.push(async () => {
            let studentLink = await ensureStudent({
              args: $item,
              context,
              create: false,
            });
            if (studentLink) {
              return unlinkStudentAttendanceFromStudentLink({
                context,
                studentLink,
                studentAttendance: result,
              });
            } else {
              const err = `can't unlinkStudentAttendanceToStudentLink item not found`;
              logger.error(err);
              throw new Error(err);
            }
          });
        }
      }

      if (args.studentLinkCreate) {
        let $item = args.studentLinkCreate as { id };
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
              const err = `can't linkStudentAttendanceToStudentLink item not found`;
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
              create: false,
            });

            if (studentLink) {
              return linkStudentAttendanceToStudentLink({
                context,
                studentLink,
                studentAttendance: result,
              });
            } else {
              const err = `can't linkStudentAttendanceToStudentLink item not found`;
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
        studentAttendance: result,
      };
    },
  ),
});
