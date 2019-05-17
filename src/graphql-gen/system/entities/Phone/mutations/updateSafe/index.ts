import gql from 'graphql-tag';
import { Schema } from '../../../../common';

import { logger, mutateSafe } from '../../../../common';

export default new Schema({
  name: 'Phone.mutation.update.safe',
  schema: gql`
    extend type Mutation {
      updateManyPhoneSafe(
        input: [updateManyPhoneInput!]
      ): [updateManyPhonePayload]
      updatePhoneSafe(input: updatePhoneInput!): updatePhonePayload
    }
  `,
  resolver: {
    Mutation: {
      updateManyPhoneSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('updateManyPhoneSafe');
          return context.resolvers.Mutation.updateManyPhone(
            root,
            args,
            context,
            info,
          );
        },
      ),
      updatePhoneSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('updatePhoneSafe');
          return context.resolvers.Mutation.updatePhone(
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
