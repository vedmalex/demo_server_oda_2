import gql from 'graphql-tag';
import { Schema } from '../../../../common';

import { logger, mutateSafe } from '../../../../common';

export default new Schema({
  name: 'StudentAttendance.mutation.update.safe',
  schema: gql`
    extend type Mutation {
      updateManyStudentAttendanceSafe(
        input: [updateManyStudentAttendanceInput!]
      ): [updateManyStudentAttendancePayload]
      updateStudentAttendanceSafe(
        input: updateStudentAttendanceInput!
      ): updateStudentAttendancePayload
    }
  `,
  resolver: {
    Mutation: {
      updateManyStudentAttendanceSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('updateManyStudentAttendanceSafe');
          return context.resolvers.Mutation.updateManyStudentAttendance(
            root,
            args,
            context,
            info,
          );
        },
      ),
      updateStudentAttendanceSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('updateStudentAttendanceSafe');
          return context.resolvers.Mutation.updateStudentAttendance(
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
