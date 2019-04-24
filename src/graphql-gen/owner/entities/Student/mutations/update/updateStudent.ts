import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  ensurePerson,
  unlinkStudentFromPerson,
  linkStudentToPerson,
  ensureGroup,
  unlinkStudentFromGroup,
  linkStudentToGroup,
  ensureMeeting,
  unlinkStudentFromMeetings,
  linkStudentToMeetings,
} from '../../../../common';
import gql from 'graphql-tag';
import { merge } from 'lodash';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      updateStudent(input: updateStudentInput!): updateStudentPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        person?: object /*Person*/;
        personUnlink?: object /*Person*/;
        personCreate?: object /*Person*/;
        group?: object /*Group*/;
        groupUnlink?: object /*Group*/;
        groupCreate?: object /*Group*/;
        meetings?: object /*Meeting*/[];
        meetingsUnlink?: object /*Meeting*/[];
        meetingsCreate?: object /*Meeting*/[];
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('updateStudent');
      let payload = context.connectors.Student.getPayload(args);

      let result;
      let previous;

      if (args.id) {
        previous = await context.connectors.Student.findOneById(args.id);
        result = await context.connectors.Student.findOneByIdAndUpdate(
          args.id,
          merge({}, previous, payload),
        );
      }

      if (!result) {
        throw new Error('item of type Student is not found for update');
      }

      if (context.pubsub) {
        context.pubsub.publish('Student', {
          Student: {
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

      if (args.personUnlink) {
        let $item = args.personUnlink;
        if ($item) {
          let person = await ensurePerson({
            args: $item,
            context,
            create: false,
          });
          await unlinkStudentFromPerson({
            context,
            person,
            student: result,
          });
        }
      }

      if (args.personCreate) {
        let $item = args.personCreate as { id };
        if ($item) {
          let person = await ensurePerson({
            args: $item,
            context,
            create: true,
          });

          await linkStudentToPerson({
            context,
            person,
            student: result,
          });
        }
      }

      if (args.person) {
        let $item = args.person as { id };
        if ($item) {
          let person = await ensurePerson({
            args: $item,
            context,
            create: false,
          });

          await linkStudentToPerson({
            context,
            person,
            student: result,
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
          await unlinkStudentFromGroup({
            context,
            group,
            student: result,
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

          await linkStudentToGroup({
            context,
            group,
            student: result,
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

          await linkStudentToGroup({
            context,
            group,
            student: result,
          });
        }
      }

      if (
        args.meetingsUnlink &&
        Array.isArray(args.meetingsUnlink) &&
        args.meetingsUnlink.length > 0
      ) {
        for (let i = 0, len = args.meetingsUnlink.length; i < len; i++) {
          let $item = args.meetingsUnlink[i];
          if ($item) {
            let meetings = await ensureMeeting({
              args: $item,
              context,
              create: false,
            });
            await unlinkStudentFromMeetings({
              context,
              meetings,
              student: result,
            });
          }
        }
      }

      if (
        args.meetingsCreate &&
        Array.isArray(args.meetingsCreate) &&
        args.meetingsCreate.length > 0
      ) {
        for (let i = 0, len = args.meetingsCreate.length; i < len; i++) {
          let $item = args.meetingsCreate[i] as { id };
          if ($item) {
            let meetings = await ensureMeeting({
              args: $item,
              context,
              create: true,
            });

            await linkStudentToMeetings({
              context,
              meetings,
              student: result,
            });
          }
        }
      }

      if (
        args.meetings &&
        Array.isArray(args.meetings) &&
        args.meetings.length > 0
      ) {
        for (let i = 0, len = args.meetings.length; i < len; i++) {
          let $item = args.meetings[i] as { id };
          if ($item) {
            let meetings = await ensureMeeting({
              args: $item,
              context,
              create: false,
            });

            await linkStudentToMeetings({
              context,
              meetings,
              student: result,
            });
          }
        }
      }

      return {
        student: result,
      };
    },
  ),
});
