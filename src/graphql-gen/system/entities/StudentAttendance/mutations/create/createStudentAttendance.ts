import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  ensureUser,
  linkStudentAttendanceToCreatedBy,
  linkStudentAttendanceToUpdateBy,
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
        createdAt?: Date;
        updatedAt?: Date;
        removed?: boolean;
        owner?: string;
        superpuper?: string;
        createdBy?: object /*User*/;
        updateBy?: object /*User*/;
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

      if (args.createdBy) {
        let $item = args.createdBy as { id };
        if ($item) {
          let createdBy = await ensureUser({
            args: $item,
            context,
            create: true,
          });
          await linkStudentAttendanceToCreatedBy({
            context,
            createdBy,
            studentAttendance: result,
          });
        }
      }

      if (args.updateBy) {
        let $item = args.updateBy as { id };
        if ($item) {
          let updateBy = await ensureUser({
            args: $item,
            context,
            create: true,
          });
          await linkStudentAttendanceToUpdateBy({
            context,
            updateBy,
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
