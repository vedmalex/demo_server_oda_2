import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
} from '../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      removeFromMeetingBelongsToManyStudents(
        input: removeFromMeetingBelongsToManyStudentsInput
      ): removeFromMeetingBelongsToManyStudentsPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        meeting?: string;
        student?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('removeFromMeetingBelongsToManyStudents');
      let meeting = args.meeting;
      let student = args.student;
      let payload = {
        meeting,
        student,
      };
      await context.connectors.Meeting.removeFromStudents(payload);

      let source = await context.connectors.Meeting.findOneById(meeting);

      if (context.pubsub) {
        context.pubsub.publish('Meeting', {
          Meeting: {
            mutation: 'UNLINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                meeting: args.meeting,
                student: args.student,
              },
              relation: 'students',
            },
          },
        });
      }

      return {
        meeting: source,
      };
    },
  ),
});
