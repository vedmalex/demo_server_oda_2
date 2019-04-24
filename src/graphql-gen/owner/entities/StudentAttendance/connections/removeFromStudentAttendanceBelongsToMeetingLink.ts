import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
} from '../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      removeFromStudentAttendanceBelongsToMeetingLink(
        input: removeFromStudentAttendanceBelongsToMeetingLinkInput
      ): removeFromStudentAttendanceBelongsToMeetingLinkPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        studentAttendance?: string;
        meeting?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('removeFromStudentAttendanceBelongsToMeetingLink');
      let studentAttendance = args.studentAttendance;
      let meeting = args.meeting;
      let payload = {
        studentAttendance,
        meeting,
      };
      await context.connectors.StudentAttendance.removeFromMeetingLink(payload);

      let source = await context.connectors.StudentAttendance.findOneById(
        studentAttendance,
      );

      if (context.pubsub) {
        context.pubsub.publish('StudentAttendance', {
          StudentAttendance: {
            mutation: 'UNLINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                studentAttendance: args.studentAttendance,
                meeting: args.meeting,
              },
              relation: 'meetingLink',
            },
          },
        });
      }

      return {
        studentAttendance: source,
      };
    },
  ),
});
