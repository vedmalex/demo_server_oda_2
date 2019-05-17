import gql from 'graphql-tag';
import { Schema } from '../../../../common';

import { logger, mutateSafe } from '../../../../common';

export default new Schema({
  name: 'StudentAttendance.mutation.create.safe',
  schema: gql`
    extend type Mutation {
      createManyStudentAttendanceSafe(
        input: [createManyStudentAttendanceInput!]
      ): [createManyStudentAttendancePayload]
      createStudentAttendanceSafe(
        input: createStudentAttendanceInput!
      ): createStudentAttendancePayload
    }
  `,
  resolver: {
    Mutation: {
      createManyStudentAttendanceSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('createManyStudentAttendanceSafe');
          return context.resolvers.Mutation.createManyStudentAttendance(
            root,
            args,
            context,
            info,
          );
        },
      ),
      createStudentAttendanceSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('createStudentAttendanceSafe');
          return context.resolvers.Mutation.createStudentAttendance(
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
