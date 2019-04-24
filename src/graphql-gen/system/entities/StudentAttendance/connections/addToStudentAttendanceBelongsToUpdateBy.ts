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
      addToStudentAttendanceBelongsToUpdateBy(
        input: addToStudentAttendanceBelongsToUpdateByInput
      ): addToStudentAttendanceBelongsToUpdateByPayload
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
      logger.trace('addToStudentAttendanceBelongsToUpdateBy');
      let studentAttendance = args.studentAttendance;
      let user = args.user;
      let payload = {
        studentAttendance,
        user,
      };

      await context.connectors.StudentAttendance.addToUpdateBy(payload);

      let source = await context.connectors.StudentAttendance.findOneById(
        studentAttendance,
      );

      if (context.pubsub) {
        context.pubsub.publish('StudentAttendance', {
          StudentAttendance: {
            mutation: 'LINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                studentAttendance: args.studentAttendance,
                user: args.user,
              },
              relation: 'updateBy',
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
