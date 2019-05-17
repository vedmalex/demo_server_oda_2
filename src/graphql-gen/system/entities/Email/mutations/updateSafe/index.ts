import gql from 'graphql-tag';
import { Schema } from '../../../../common';

import { logger, mutateSafe } from '../../../../common';

export default new Schema({
  name: 'Email.mutation.update.safe',
  schema: gql`
    extend type Mutation {
      updateManyEmailSafe(
        input: [updateManyEmailInput!]
      ): [updateManyEmailPayload]
      updateEmailSafe(input: updateEmailInput!): updateEmailPayload
    }
  `,
  resolver: {
    Mutation: {
      updateManyEmailSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('updateManyEmailSafe');
          return context.resolvers.Mutation.updateManyEmail(
            root,
            args,
            context,
            info,
          );
        },
      ),
      updateEmailSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('updateEmailSafe');
          return context.resolvers.Mutation.updateEmail(
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
