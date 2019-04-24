import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  ensureUser,
  unlinkStudentAttendanceFromCreatedBy,
  linkStudentAttendanceToCreatedBy,
  unlinkStudentAttendanceFromUpdateBy,
  linkStudentAttendanceToUpdateBy,
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
        createdAt?: Date;
        updatedAt?: Date;
        removed?: boolean;
        owner?: string;
        superpuper?: string;
        createdBy?: object /*User*/;
        createdByUnlink?: object /*User*/;
        createdByCreate?: object /*User*/;
        updateBy?: object /*User*/;
        updateByUnlink?: object /*User*/;
        updateByCreate?: object /*User*/;
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

      if (args.createdByUnlink) {
        let $item = args.createdByUnlink;
        if ($item) {
          let createdBy = await ensureUser({
            args: $item,
            context,
            create: false,
          });
          await unlinkStudentAttendanceFromCreatedBy({
            context,
            createdBy,
            studentAttendance: result,
          });
        }
      }

      if (args.createdByCreate) {
        let $item = args.createdByCreate as { id };
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

      if (args.createdBy) {
        let $item = args.createdBy as { id };
        if ($item) {
          let createdBy = await ensureUser({
            args: $item,
            context,
            create: false,
          });

          await linkStudentAttendanceToCreatedBy({
            context,
            createdBy,
            studentAttendance: result,
          });
        }
      }

      if (args.updateByUnlink) {
        let $item = args.updateByUnlink;
        if ($item) {
          let updateBy = await ensureUser({
            args: $item,
            context,
            create: false,
          });
          await unlinkStudentAttendanceFromUpdateBy({
            context,
            updateBy,
            studentAttendance: result,
          });
        }
      }

      if (args.updateByCreate) {
        let $item = args.updateByCreate as { id };
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

      if (args.updateBy) {
        let $item = args.updateBy as { id };
        if ($item) {
          let updateBy = await ensureUser({
            args: $item,
            context,
            create: false,
          });

          await linkStudentAttendanceToUpdateBy({
            context,
            updateBy,
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
