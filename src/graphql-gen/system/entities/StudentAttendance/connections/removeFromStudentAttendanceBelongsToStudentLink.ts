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
    extend type Mutation {
      removeFromStudentAttendanceBelongsToStudentLink(
        input: removeFromStudentAttendanceBelongsToStudentLinkInput
      ): removeFromStudentAttendanceBelongsToStudentLinkPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        studentAttendance?: string;
        student?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('removeFromStudentAttendanceBelongsToStudentLink');
      let studentAttendance = args.studentAttendance;
      let student = args.student;
      let payload = {
        studentAttendance,
        student,
      };
      await context.connectors.StudentAttendance.removeFromStudentLink(payload);

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
                student: args.student,
              },
              relation: 'studentLink',
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
