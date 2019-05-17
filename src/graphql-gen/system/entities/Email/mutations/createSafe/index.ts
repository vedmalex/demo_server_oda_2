import gql from 'graphql-tag';
import { Schema } from '../../../../common';

import { logger, mutateSafe } from '../../../../common';

export default new Schema({
  name: 'Email.mutation.create.safe',
  schema: gql`
    extend type Mutation {
      createManyEmailSafe(
        input: [createManyEmailInput!]
      ): [createManyEmailPayload]
      createEmailSafe(input: createEmailInput!): createEmailPayload
    }
  `,
  resolver: {
    Mutation: {
      createManyEmailSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('createManyEmailSafe');
          return context.resolvers.Mutation.createManyEmail(
            root,
            args,
            context,
            info,
          );
        },
      ),
      createEmailSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('createEmailSafe');
          return context.resolvers.Mutation.createEmail(
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
