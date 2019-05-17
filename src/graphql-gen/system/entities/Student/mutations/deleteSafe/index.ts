import gql from 'graphql-tag';
import { Schema } from '../../../../common';

import { logger, mutateSafe } from '../../../../common';

export default new Schema({
  name: 'Student.mutation.delete.safe',
  schema: gql`
    extend type Mutation {
      deleteManyStudentSafe(
        input: [deleteManyStudentInput!]
      ): [deleteManyStudentPayload]
      deleteStudentSafe(input: deleteStudentInput!): deleteStudentPayload
    }
  `,
  resolver: {
    Mutation: {
      deleteManyStudentSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('deleteManyStudentSafe');
          return context.resolvers.Mutation.deleteManyStudent(
            root,
            args,
            context,
            info,
          );
        },
      ),
      deleteStudentSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('deleteStudentSafe');
          return context.resolvers.Mutation.deleteStudent(
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
