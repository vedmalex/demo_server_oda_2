import gql from 'graphql-tag';
import { Schema } from '../../../../common';

import { logger, mutateSafe } from '../../../../common';

export default new Schema({
  name: 'Subject.mutation.delete.safe',
  schema: gql`
    extend type Mutation {
      deleteManySubjectSafe(
        input: [deleteManySubjectInput!]
      ): [deleteManySubjectPayload]
      deleteSubjectSafe(input: deleteSubjectInput!): deleteSubjectPayload
    }
  `,
  resolver: {
    Mutation: {
      deleteManySubjectSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('deleteManySubjectSafe');
          return context.resolvers.Mutation.deleteManySubject(
            root,
            args,
            context,
            info,
          );
        },
      ),
      deleteSubjectSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('deleteSubjectSafe');
          return context.resolvers.Mutation.deleteSubject(
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
