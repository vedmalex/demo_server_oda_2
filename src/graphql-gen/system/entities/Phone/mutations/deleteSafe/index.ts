import gql from 'graphql-tag';
import { Schema } from '../../../../common';

import { logger, mutateSafe } from '../../../../common';

export default new Schema({
  name: 'Phone.mutation.delete.safe',
  schema: gql`
    extend type Mutation {
      deleteManyPhoneSafe(
        input: [deleteManyPhoneInput!]
      ): [deleteManyPhonePayload]
      deletePhoneSafe(input: deletePhoneInput!): deletePhonePayload
    }
  `,
  resolver: {
    Mutation: {
      deleteManyPhoneSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('deleteManyPhoneSafe');
          return context.resolvers.Mutation.deleteManyPhone(
            root,
            args,
            context,
            info,
          );
        },
      ),
      deletePhoneSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('deletePhoneSafe');
          return context.resolvers.Mutation.deletePhone(
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
