import gql from 'graphql-tag';
import { Schema } from '../../../../common';

import { logger, mutateSafe } from '../../../../common';

export default new Schema({
  name: 'Student.mutation.update.safe',
  schema: gql`
    extend type Mutation {
      updateManyStudentSafe(
        input: [updateManyStudentInput!]
      ): [updateManyStudentPayload]
      updateStudentSafe(input: updateStudentInput!): updateStudentPayload
    }
  `,
  resolver: {
    Mutation: {
      updateManyStudentSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('updateManyStudentSafe');
          return context.resolvers.Mutation.updateManyStudent(
            root,
            args,
            context,
            info,
          );
        },
      ),
      updateStudentSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('updateStudentSafe');
          return context.resolvers.Mutation.updateStudent(
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
