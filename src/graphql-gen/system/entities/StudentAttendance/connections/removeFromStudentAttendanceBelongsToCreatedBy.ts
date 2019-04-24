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
      removeFromStudentAttendanceBelongsToCreatedBy(
        input: removeFromStudentAttendanceBelongsToCreatedByInput
      ): removeFromStudentAttendanceBelongsToCreatedByPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        studentAttendance?: string;
        user?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('removeFromStudentAttendanceBelongsToCreatedBy');
      let studentAttendance = args.studentAttendance;
      let user = args.user;
      let payload = {
        studentAttendance,
        user,
      };
      await context.connectors.StudentAttendance.removeFromCreatedBy(payload);

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
                user: args.user,
              },
              relation: 'createdBy',
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
