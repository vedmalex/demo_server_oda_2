import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  ensureUser,
  unlinkPersonFromUser,
  linkPersonToUser,
  ensureStudent,
  unlinkPersonFromAsStudents,
  linkPersonToAsStudents,
  ensureCurator,
  unlinkPersonFromAsCurator,
  linkPersonToAsCurator,
} from '../../../../common';
import gql from 'graphql-tag';
import { merge } from 'lodash';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      updatePerson(input: updatePersonInput!): updatePersonPayload
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
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      const needCommit = await context.connectors.ensureTransaction();
      const txn = await context.connectors.transaction;
      logger.trace('updatePerson');
      try {
        let payload = context.connectors.Person.getPayload(args);

        let result;
        let previous;

        if (args.id) {
          previous = await context.connectors.Person.findOneById(args.id);
          result = await context.connectors.Person.findOneByIdAndUpdate(
            args.id,
            merge({}, previous, payload),
          );
        } else if (args.spiritualName) {
          delete payload.spiritualName;
          previous = await context.connectors.Person.findOneBySpiritualName(
            args.spiritualName,
          );
          result = await context.connectors.Person.findOneBySpiritualNameAndUpdate(
            args.spiritualName,
            merge({}, previous, payload),
          );
        } else if (args.fullName) {
          delete payload.fullName;
          previous = await context.connectors.Person.findOneByFullName(
            args.fullName,
          );
          result = await context.connectors.Person.findOneByFullNameAndUpdate(
            args.fullName,
            merge({}, previous, payload),
          );
        }

        if (!result) {
          throw new Error('item of type Person is not found for update');
        }

        if (context.pubsub) {
          context.pubsub.publish('Person', {
            Person: {
              mutation: 'UPDATE',
              node: result,
              previous,
              updatedFields: Object.keys(payload).filter(
                f => payload[f] !== undefined,
              ),
              payload: args,
            },
          });
        }

        let resActions = [];
        if (args.userUnlink) {
          let $item = args.userUnlink;
          if ($item) {
            resActions.push(async () => {
              let user = await ensureUser({
                args: $item,
                context,
                create: false,
              });
              return unlinkPersonFromUser({
                context,
                user,
                person: result,
              });
            });
          }
        }

        if (args.userCreate) {
          let $item = args.userCreate as { id };
          if ($item) {
            resActions.push(async () => {
              let user = await ensureUser({
                args: $item,
                context,
                create: true,
              });

              return linkPersonToUser({
                context,
                user,
                person: result,
              });
            });
          }
        }

        if (args.user) {
          let $item = args.user as { id };
          if ($item) {
            resActions.push(async () => {
              let user = await ensureUser({
                args: $item,
                context,
                create: false,
              });

              return linkPersonToUser({
                context,
                user,
                person: result,
              });
            });
          }
        }

        if (
          args.asStudentsUnlink &&
          Array.isArray(args.asStudentsUnlink) &&
          args.asStudentsUnlink.length > 0
        ) {
          for (let i = 0, len = args.asStudentsUnlink.length; i < len; i++) {
            let $item = args.asStudentsUnlink[i];
            if ($item) {
              resActions.push(async () => {
                let asStudents = await ensureStudent({
                  args: $item,
                  context,
                  create: false,
                });
                return unlinkPersonFromAsStudents({
                  context,
                  asStudents,
                  person: result,
                });
              });
            }
          }
        }

        if (
          args.asStudentsCreate &&
          Array.isArray(args.asStudentsCreate) &&
          args.asStudentsCreate.length > 0
        ) {
          for (let i = 0, len = args.asStudentsCreate.length; i < len; i++) {
            let $item = args.asStudentsCreate[i] as { id };
            if ($item) {
              resActions.push(async () => {
                let asStudents = await ensureStudent({
                  args: $item,
                  context,
                  create: true,
                });

                return linkPersonToAsStudents({
                  context,
                  asStudents,
                  person: result,
                });
              });
            }
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
                  create: false,
                });

                return linkPersonToAsStudents({
                  context,
                  asStudents,
                  person: result,
                });
              });
            }
          }
        }

        if (args.asCuratorUnlink) {
          let $item = args.asCuratorUnlink;
          if ($item) {
            resActions.push(async () => {
              let asCurator = await ensureCurator({
                args: $item,
                context,
                create: false,
              });
              return unlinkPersonFromAsCurator({
                context,
                asCurator,
                person: result,
              });
            });
          }
        }

        if (args.asCuratorCreate) {
          let $item = args.asCuratorCreate as { id };
          if ($item) {
            resActions.push(async () => {
              let asCurator = await ensureCurator({
                args: $item,
                context,
                create: true,
              });

              return linkPersonToAsCurator({
                context,
                asCurator,
                person: result,
              });
            });
          }
        }

        if (args.asCurator) {
          let $item = args.asCurator as { id };
          if ($item) {
            resActions.push(async () => {
              let asCurator = await ensureCurator({
                args: $item,
                context,
                create: false,
              });

              return linkPersonToAsCurator({
                context,
                asCurator,
                person: result,
              });
            });
          }
        }

        if (resActions.length > 0) {
          await Promise.all(resActions);
        }
        if (needCommit) {
          return txn.commit().then(() => ({
            person: result,
          }));
        } else {
          return {
            person: result,
          };
        }
      } catch (e) {
        await txn.abort();
        throw e;
      }
    },
  ),
});
