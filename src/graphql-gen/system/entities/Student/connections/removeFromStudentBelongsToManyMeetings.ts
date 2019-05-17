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
    extend type Mutation {
      removeFromStudentBelongsToManyMeetings(
        input: removeFromStudentBelongsToManyMeetingsInput
      ): removeFromStudentBelongsToManyMeetingsPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        student?: string;
        meeting?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('removeFromStudentBelongsToManyMeetings');
      let student = args.student;
      let meeting = args.meeting;
      let payload = {
        student,
        meeting,
      };
      await context.connectors.Student.removeFromMeetings(payload);

      let source = await context.connectors.Student.findOneById(student);

      if (context.pubsub) {
        context.pubsub.publish('Student', {
          Student: {
            mutation: 'UNLINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                student: args.student,
                meeting: args.meeting,
              },
              relation: 'meetings',
            },
          },
        });
      }

      return {
        student: source,
      };
    },
  ),
});
