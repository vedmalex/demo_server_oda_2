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
    extend type Mutation {
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
      logger.trace('updateManyPerson');
      const result = args.map(input => {
        return context.resolvers.Mutation.updatePerson(
          undefined,
          { input },
          context,
          info,
        );
      });

      return await Promise.all(result);
    },
  ),
});
