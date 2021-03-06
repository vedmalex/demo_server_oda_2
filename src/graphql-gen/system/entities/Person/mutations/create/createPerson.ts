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
    extend type Mutation {
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

      let resActions = [];
      if (args.user) {
        let $item = args.user as { id };
        if ($item) {
          resActions.push(async () => {
            let user = await ensureUser({
              args: $item,
              context,
              create: true,
            });
            if (user) {
              return linkPersonToUser({
                context,
                user,
                person: result,
              });
            } else {
              const err = `can't linkPersonToUser item not created`;
              logger.error(err);
              throw new Error(err);
            }
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
            resActions.push(async () => {
              let asStudents = await ensureStudent({
                args: $item,
                context,
                create: true,
              });
              if (asStudents) {
                return linkPersonToAsStudents({
                  context,
                  asStudents,
                  person: result,
                });
              } else {
                const err = `can't linkPersonToAsStudents item not created`;
                logger.error(err);
                throw new Error(err);
              }
            });
          }
        }
      }
      if (args.asCurator) {
        let $item = args.asCurator as { id };
        if ($item) {
          resActions.push(async () => {
            let asCurator = await ensureCurator({
              args: $item,
              context,
              create: true,
            });
            if (asCurator) {
              return linkPersonToAsCurator({
                context,
                asCurator,
                person: result,
              });
            } else {
              const err = `can't linkPersonToAsCurator item not created`;
              logger.error(err);
              throw new Error(err);
            }
          });
        }
      }
      if (resActions.length > 0) {
        await Promise.all(resActions);
      }

      return {
        person: personEdge,
      };
    },
  ),
});
