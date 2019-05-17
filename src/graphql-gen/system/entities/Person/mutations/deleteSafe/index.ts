import gql from 'graphql-tag';
import { Schema } from '../../../../common';

import { logger, mutateSafe } from '../../../../common';

export default new Schema({
  name: 'Person.mutation.delete.safe',
  schema: gql`
    extend type Mutation {
      deleteManyPersonSafe(
        input: [deleteManyPersonInput!]
      ): [deleteManyPersonPayload]
      deletePersonSafe(input: deletePersonInput!): deletePersonPayload
    }
  `,
  resolver: {
    Mutation: {
      deleteManyPersonSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('deleteManyPersonSafe');
          return context.resolvers.Mutation.deleteManyPerson(
            root,
            args,
            context,
            info,
          );
        },
      ),
      deletePersonSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('deletePersonSafe');
          return context.resolvers.Mutation.deletePerson(
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
