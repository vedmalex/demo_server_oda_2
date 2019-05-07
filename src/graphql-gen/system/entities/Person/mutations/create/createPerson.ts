import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  ensureUser,
  linkPersonToUser,
  ensureStudent,
  linkPersonToAsStudents,
  ensureCurator,
  linkPersonToAsCurator,
} from '../../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      createPerson(input: createPersonInput!): createPersonPayload
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
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('createPerson');
      let create = context.connectors.Person.getPayload(args, false);

      let result = await context.connectors.Person.create(create);

      if (context.pubsub) {
        context.pubsub.publish('Person', {
          Person: {
            mutation: 'CREATE',
            node: result,
            previous: null,
            updatedFields: [],
            payload: args,
          },
        });
      }

      let personEdge = {
        cursor: result.id,
        node: result,
      };

      if (args.user) {
        let $item = args.user as { id };
        if ($item) {
          let user = await ensureUser({
            args: $item,
            context,
            create: true,
          });
          await linkPersonToUser({
            context,
            user,
            person: result,
          });
        }
      }

      if (
        args.asStudents &&
        Array.isArray(args.asStudents) &&
        args.asStudents.length > 0
      ) {
        for (let i = 0, len = args.asStudents.length; i < len; i++) {
          let $item = args.asStudents[i] as { id };
          if ($item) {
            let asStudents = await ensureStudent({
              args: $item,
              context,
              create: true,
            });
            await linkPersonToAsStudents({
              context,
              asStudents,
              person: result,
            });
          }
        }
      }

      if (args.asCurator) {
        let $item = args.asCurator as { id };
        if ($item) {
          let asCurator = await ensureCurator({
            args: $item,
            context,
            create: true,
          });
          await linkPersonToAsCurator({
            context,
            asCurator,
            person: result,
          });
        }
      }

      return {
        person: personEdge,
      };
    },
  ),
});
