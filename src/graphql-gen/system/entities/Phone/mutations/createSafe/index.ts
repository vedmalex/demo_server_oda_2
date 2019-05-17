import gql from 'graphql-tag';
import { Schema } from '../../../../common';

import { logger, mutateSafe } from '../../../../common';

export default new Schema({
  name: 'Phone.mutation.create.safe',
  schema: gql`
    extend type Mutation {
      createManyPhoneSafe(
        input: [createManyPhoneInput!]
      ): [createManyPhonePayload]
      createPhoneSafe(input: createPhoneInput!): createPhonePayload
    }
  `,
  resolver: {
    Mutation: {
      createManyPhoneSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('createManyPhoneSafe');
          return context.resolvers.Mutation.createManyPhone(
            root,
            args,
            context,
            info,
          );
        },
      ),
      createPhoneSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('createPhoneSafe');
          return context.resolvers.Mutation.createPhone(
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
