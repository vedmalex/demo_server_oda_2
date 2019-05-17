import gql from 'graphql-tag';
import { Schema } from '../../../../common';

import { logger, mutateSafe } from '../../../../common';

export default new Schema({
  name: 'Student.mutation.create.safe',
  schema: gql`
    extend type Mutation {
      createManyStudentSafe(
        input: [createManyStudentInput!]
      ): [createManyStudentPayload]
      createStudentSafe(input: createStudentInput!): createStudentPayload
    }
  `,
  resolver: {
    Mutation: {
      createManyStudentSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('createManyStudentSafe');
          return context.resolvers.Mutation.createManyStudent(
            root,
            args,
            context,
            info,
          );
        },
      ),
      createStudentSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('createStudentSafe');
          return context.resolvers.Mutation.createStudent(
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
