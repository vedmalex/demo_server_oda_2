import gql from 'graphql-tag';
import { Schema } from '../../../../common';

import { logger, mutateSafe } from '../../../../common';

export default new Schema({
  name: 'Subject.mutation.create.safe',
  schema: gql`
    extend type Mutation {
      createManySubjectSafe(
        input: [createManySubjectInput!]
      ): [createManySubjectPayload]
      createSubjectSafe(input: createSubjectInput!): createSubjectPayload
    }
  `,
  resolver: {
    Mutation: {
      createManySubjectSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('createManySubjectSafe');
          return context.resolvers.Mutation.createManySubject(
            root,
            args,
            context,
            info,
          );
        },
      ),
      createSubjectSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('createSubjectSafe');
          return context.resolvers.Mutation.createSubject(
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
