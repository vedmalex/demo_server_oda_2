import gql from 'graphql-tag';
import { Schema } from '../../../../common';

import { logger, mutateSafe } from '../../../../common';

export default new Schema({
  name: 'Subject.mutation.update.safe',
  schema: gql`
    extend type Mutation {
      updateManySubjectSafe(
        input: [updateManySubjectInput!]
      ): [updateManySubjectPayload]
      updateSubjectSafe(input: updateSubjectInput!): updateSubjectPayload
    }
  `,
  resolver: {
    Mutation: {
      updateManySubjectSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('updateManySubjectSafe');
          return context.resolvers.Mutation.updateManySubject(
            root,
            args,
            context,
            info,
          );
        },
      ),
      updateSubjectSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('updateSubjectSafe');
          return context.resolvers.Mutation.updateSubject(
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
