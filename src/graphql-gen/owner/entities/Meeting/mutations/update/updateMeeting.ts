import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  ensureCurator,
  unlinkMeetingFromCurator,
  linkMeetingToCurator,
  ensureGroup,
  unlinkMeetingFromGroup,
  linkMeetingToGroup,
  ensureStudent,
  unlinkMeetingFromStudents,
  linkMeetingToStudents,
} from '../../../../common';
import gql from 'graphql-tag';
import { merge } from 'lodash';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      updateMeeting(input: updateMeetingInput!): updateMeetingPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        date?: Date;
        curator?: object /*Curator*/;
        curatorUnlink?: object /*Curator*/;
        curatorCreate?: object /*Curator*/;
        group?: object /*Group*/;
        groupUnlink?: object /*Group*/;
        groupCreate?: object /*Group*/;
        students?: object /*Student*/[];
        studentsUnlink?: object /*Student*/[];
        studentsCreate?: object /*Student*/[];
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('updateMeeting');
      let payload = context.connectors.Meeting.getPayload(args);

      let result;
      let previous;

      if (args.id) {
        previous = await context.connectors.Meeting.findOneById(args.id);
        result = await context.connectors.Meeting.findOneByIdAndUpdate(
          args.id,
          merge({}, previous, payload),
        );
      }

      if (!result) {
        throw new Error('item of type Meeting is not found for update');
      }

      if (context.pubsub) {
        context.pubsub.publish('Meeting', {
          Meeting: {
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

      if (args.curatorUnlink) {
        let $item = args.curatorUnlink;
        if ($item) {
          let curator = await ensureCurator({
            args: $item,
            context,
            create: false,
          });
          await unlinkMeetingFromCurator({
            context,
            curator,
            meeting: result,
          });
        }
      }

      if (args.curatorCreate) {
        let $item = args.curatorCreate as { id };
        if ($item) {
          let curator = await ensureCurator({
            args: $item,
            context,
            create: true,
          });

          await linkMeetingToCurator({
            context,
            curator,
            meeting: result,
          });
        }
      }

      if (args.curator) {
        let $item = args.curator as { id };
        if ($item) {
          let curator = await ensureCurator({
            args: $item,
            context,
            create: false,
          });

          await linkMeetingToCurator({
            context,
            curator,
            meeting: result,
          });
        }
      }

      if (args.groupUnlink) {
        let $item = args.groupUnlink;
        if ($item) {
          let group = await ensureGroup({
            args: $item,
            context,
            create: false,
          });
          await unlinkMeetingFromGroup({
            context,
            group,
            meeting: result,
          });
        }
      }

      if (args.groupCreate) {
        let $item = args.groupCreate as { id };
        if ($item) {
          let group = await ensureGroup({
            args: $item,
            context,
            create: true,
          });

          await linkMeetingToGroup({
            context,
            group,
            meeting: result,
          });
        }
      }

      if (args.group) {
        let $item = args.group as { id };
        if ($item) {
          let group = await ensureGroup({
            args: $item,
            context,
            create: false,
          });

          await linkMeetingToGroup({
            context,
            group,
            meeting: result,
          });
        }
      }

      if (
        args.studentsUnlink &&
        Array.isArray(args.studentsUnlink) &&
        args.studentsUnlink.length > 0
      ) {
        for (let i = 0, len = args.studentsUnlink.length; i < len; i++) {
          let $item = args.studentsUnlink[i];
          if ($item) {
            let students = await ensureStudent({
              args: $item,
              context,
              create: false,
            });
            await unlinkMeetingFromStudents({
              context,
              students,
              meeting: result,
            });
          }
        }
      }

      if (
        args.studentsCreate &&
        Array.isArray(args.studentsCreate) &&
        args.studentsCreate.length > 0
      ) {
        for (let i = 0, len = args.studentsCreate.length; i < len; i++) {
          let $item = args.studentsCreate[i] as {
            id;
            present;
            specialNotes;
            superpuper;
          };
          if ($item) {
            let students = await ensureStudent({
              args: $item,
              context,
              create: true,
            });

            await linkMeetingToStudents({
              context,
              students,
              meeting: result,
              present: $item.present,
              specialNotes: $item.specialNotes,
              superpuper: $item.superpuper,
            });
          }
        }
      }

      if (
        args.students &&
        Array.isArray(args.students) &&
        args.students.length > 0
      ) {
        for (let i = 0, len = args.students.length; i < len; i++) {
          let $item = args.students[i] as {
            id;
            present;
            specialNotes;
            superpuper;
          };
          if ($item) {
            let students = await ensureStudent({
              args: $item,
              context,
              create: false,
            });

            await linkMeetingToStudents({
              context,
              students,
              meeting: result,
              present: $item.present,
              specialNotes: $item.specialNotes,
              superpuper: $item.superpuper,
            });
          }
        }
      }

      return {
        meeting: result,
      };
    },
  ),
});
