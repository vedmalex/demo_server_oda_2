import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
} from '../../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      createManyPerson(
        input: [createManyPersonInput!]
      ): [createManyPersonPayload]
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        spiritualName?: string;
        fullName?: string;
        dateOfBirth?: Date;
        specialNotes?: string;
        user?: object /*User*/;
        socialNetworks?: object /*SocialNetwork*/[];
        phones?: object /*Phone*/[];
        emails?: object /*Email*/[];
        asStudents?: object /*Student*/[];
        asCurator?: object /*Curator*/;
      }[],
      context: {
        connectors: RegisterConnectors;
        pubsub: PubSubEngine;
        resolvers: any;
      },
      info,
    ) => {
      const needCommit = await context.connectors.ensureTransaction();
      const txn = await context.connectors.transaction;
      logger.trace('createManyPerson');
      const result = args.map(input => {
        return context.resolvers.RootMutation.createPerson(
          undefined,
          { input },
          context,
          info,
        );
      });

      try {
        const res = await Promise.all(result);
        if (needCommit) {
          return txn.commit().then(() => res);
        } else {
          return res;
        }
      } catch (err) {
        await txn.abort();
        throw err;
      }
    },
  ),
});
