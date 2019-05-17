import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  ensurePerson,
  linkStudentToPerson,
  ensureGroup,
  linkStudentToGroup,
  ensureMeeting,
  linkStudentToMeetings,
} from '../../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type Mutation {
      createStudent(input: createStudentInput!): createStudentPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        person?: object /*Person*/;
        group?: object /*Group*/;
        meetings?: object /*Meeting*/[];
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('createStudent');
      let create = context.connectors.Student.getPayload(args, false);

      let result = await context.connectors.Student.create(create);

      if (context.pubsub) {
        context.pubsub.publish('Student', {
          Student: {
            mutation: 'CREATE',
            node: result,
            previous: null,
            updatedFields: [],
            payload: args,
          },
        });
      }

      let studentEdge = {
        cursor: result.id,
        node: result,
      };

      let resActions = [];
      if (args.person) {
        let $item = args.person as { id };
        if ($item) {
          resActions.push(async () => {
            let person = await ensurePerson({
              args: $item,
              context,
              create: true,
            });
            if (person) {
              return linkStudentToPerson({
                context,
                person,
                student: result,
              });
            } else {
              const err = `can't linkStudentToPerson item not created`;
              logger.error(err);
              throw new Error(err);
            }
          });
        }
      }
      if (args.group) {
        let $item = args.group as { id };
        if ($item) {
          resActions.push(async () => {
            let group = await ensureGroup({
              args: $item,
              context,
              create: true,
            });
            if (group) {
              return linkStudentToGroup({
                context,
                group,
                student: result,
              });
            } else {
              const err = `can't linkStudentToGroup item not created`;
              logger.error(err);
              throw new Error(err);
            }
          });
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
            resActions.push(async () => {
              let meetings = await ensureMeeting({
                args: $item,
                context,
                create: true,
              });
              if (meetings) {
                return linkStudentToMeetings({
                  context,
                  meetings,
                  student: result,
                });
              } else {
                const err = `can't linkStudentToMeetings item not created`;
                logger.error(err);
                throw new Error(err);
              }
            });
          }
        }
      }
      if (resActions.length > 0) {
        await Promise.all(resActions);
      }

      return {
        student: studentEdge,
      };
    },
  ),
});
