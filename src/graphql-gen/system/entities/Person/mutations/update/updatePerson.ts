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
      logger.trace('updatePerson');
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

      if (args.userUnlink) {
        let $item = args.userUnlink;
        if ($item) {
          let user = await ensureUser({
            args: $item,
            context,
            create: false,
          });
          await unlinkPersonFromUser({
            context,
            user,
            person: result,
          });
        }
      }

      if (args.userCreate) {
        let $item = args.userCreate as { id };
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

      if (args.user) {
        let $item = args.user as { id };
        if ($item) {
          let user = await ensureUser({
            args: $item,
            context,
            create: false,
          });

          await linkPersonToUser({
            context,
            user,
            person: result,
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
            let asStudents = await ensureStudent({
              args: $item,
              context,
              create: false,
            });
            await unlinkPersonFromAsStudents({
              context,
              asStudents,
              person: result,
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
              create: false,
            });

            await linkPersonToAsStudents({
              context,
              asStudents,
              person: result,
            });
          }
        }
      }

      if (args.asCuratorUnlink) {
        let $item = args.asCuratorUnlink;
        if ($item) {
          let asCurator = await ensureCurator({
            args: $item,
            context,
            create: false,
          });
          await unlinkPersonFromAsCurator({
            context,
            asCurator,
            person: result,
          });
        }
      }

      if (args.asCuratorCreate) {
        let $item = args.asCuratorCreate as { id };
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

      if (args.asCurator) {
        let $item = args.asCurator as { id };
        if ($item) {
          let asCurator = await ensureCurator({
            args: $item,
            context,
            create: false,
          });

          await linkPersonToAsCurator({
            context,
            asCurator,
            person: result,
          });
        }
      }

      return {
        person: result,
      };
    },
  ),
});
