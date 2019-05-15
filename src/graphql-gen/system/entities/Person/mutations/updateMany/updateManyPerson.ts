import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
} from '../../../../common';
import gql from 'graphql-tag';
import { merge } from 'lodash';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      updateManyPerson(
        input: [updateManyPersonInput!]
      ): [updateManyPersonPayload]
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
        userUnlink?: object /*User*/;
        userCreate?: object /*User*/;
        socialNetworks?: object /*SocialNetwork*/[];
        socialNetworksUnlink?: object /*SocialNetwork*/[];
        socialNetworksCreate?: object /*SocialNetwork*/[];
        phones?: object /*Phone*/[];
        phonesUnlink?: object /*Phone*/[];
        phonesCreate?: object /*Phone*/[];
        emails?: object /*Email*/[];
        emailsUnlink?: object /*Email*/[];
        emailsCreate?: object /*Email*/[];
        asStudents?: object /*Student*/[];
        asStudentsUnlink?: object /*Student*/[];
        asStudentsCreate?: object /*Student*/[];
        asCurator?: object /*Curator*/;
        asCuratorUnlink?: object /*Curator*/;
        asCuratorCreate?: object /*Curator*/;
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
      logger.trace('updateManyPerson');
      const result = args.map(input => {
        return context.resolvers.RootMutation.updatePerson(
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
