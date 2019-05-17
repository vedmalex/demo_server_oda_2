import gql from 'graphql-tag';
import { Schema } from '../../../../common';

import { logger, mutateSafe } from '../../../../common';

export default new Schema({
  name: 'StudentAttendance.mutation.delete.safe',
  schema: gql`
    extend type Mutation {
      deleteManyStudentAttendanceSafe(
        input: [deleteManyStudentAttendanceInput!]
      ): [deleteManyStudentAttendancePayload]
      deleteStudentAttendanceSafe(
        input: deleteStudentAttendanceInput!
      ): deleteStudentAttendancePayload
    }
  `,
  resolver: {
    Mutation: {
      deleteManyStudentAttendanceSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('deleteManyStudentAttendanceSafe');
          return context.resolvers.Mutation.deleteManyStudentAttendance(
            root,
            args,
            context,
            info,
          );
        },
      ),
      deleteStudentAttendanceSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('deleteStudentAttendanceSafe');
          return context.resolvers.Mutation.deleteStudentAttendance(
            root,
            args,
            context,
            info,
          );
        },
      ),
    },
  },
});
