import gql from 'graphql-tag';
import { Schema } from '../../../../common';

import { logger, mutateSafe } from '../../../../common';

export default new Schema({
  name: 'Person.mutation.update.safe',
  schema: gql`
    extend type Mutation {
      updateManyPersonSafe(
        input: [updateManyPersonInput!]
      ): [updateManyPersonPayload]
      updatePersonSafe(input: updatePersonInput!): updatePersonPayload
    }
  `,
  resolver: {
    Mutation: {
      updateManyPersonSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('updateManyPersonSafe');
          return context.resolvers.Mutation.updateManyPerson(
            root,
            args,
            context,
            info,
          );
        },
      ),
      updatePersonSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('updatePersonSafe');
          return context.resolvers.Mutation.updatePerson(
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
