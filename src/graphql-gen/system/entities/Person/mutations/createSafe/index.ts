import gql from 'graphql-tag';
import { Schema } from '../../../../common';

import { logger, mutateSafe } from '../../../../common';

export default new Schema({
  name: 'Person.mutation.create.safe',
  schema: gql`
    extend type Mutation {
      createManyPersonSafe(
        input: [createManyPersonInput!]
      ): [createManyPersonPayload]
      createPersonSafe(input: createPersonInput!): createPersonPayload
    }
  `,
  resolver: {
    Mutation: {
      createManyPersonSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('createManyPersonSafe');
          return context.resolvers.Mutation.createManyPerson(
            root,
            args,
            context,
            info,
          );
        },
      ),
      createPersonSafe: mutateSafe(
        async (root, args, context: { resolvers: any }, info) => {
          logger.trace('createPersonSafe');
          return context.resolvers.Mutation.createPerson(
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
