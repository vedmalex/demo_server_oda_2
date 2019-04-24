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
      addToMeetingBelongsToManyStudents(
        input: addToMeetingBelongsToManyStudentsInput
      ): addToMeetingBelongsToManyStudentsPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        meeting?: string;
        student?: string;
        present?: boolean;
        specialNotes?: string;
        superpuper?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('addToMeetingBelongsToManyStudents');
      let meeting = args.meeting;
      let student = args.student;
      let payload = {
        meeting,
        student,
        present: args.present,
        specialNotes: args.specialNotes,
        superpuper: args.superpuper,
      };

      await context.connectors.Meeting.addToStudents(payload);

      let source = await context.connectors.Meeting.findOneById(meeting);

      if (context.pubsub) {
        context.pubsub.publish('Meeting', {
          Meeting: {
            mutation: 'LINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                meeting: args.meeting,
                student: args.student,
                present: args.present,
                specialNotes: args.specialNotes,
                superpuper: args.superpuper,
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
