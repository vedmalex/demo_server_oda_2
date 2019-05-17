import gql from 'graphql-tag';
import { Schema } from '../../../../common';

import { logger, mutateSafe } from '../../../../common';

export default new Schema({
  name: 'Email.mutation.delete.safe',
  schema: gql`
    extend type Mutation {
      deleteManyEmailSafe(
        input: [deleteManyEmailInput!]
      ): [deleteManyEmailPayload]
      deleteEmailSafe(input: deleteEmailInput!): deleteEmailPayload
    }
  `,
  resolver: {
    Mutation: {
      deleteManyEmailSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('deleteManyEmailSafe');
          return context.resolvers.Mutation.deleteManyEmail(
            root,
            args,
            context,
            info,
          );
        },
      ),
      deleteEmailSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('deleteEmailSafe');
          return context.resolvers.Mutation.deleteEmail(
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
