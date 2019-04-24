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
      removeFromCourseBelongsToManySubjects(
        input: removeFromCourseBelongsToManySubjectsInput
      ): removeFromCourseBelongsToManySubjectsPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        course?: string;
        subject?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('removeFromCourseBelongsToManySubjects');
      let course = args.course;
      let subject = args.subject;
      let payload = {
        course,
        subject,
      };
      await context.connectors.Course.removeFromSubjects(payload);

      let source = await context.connectors.Course.findOneById(course);

      if (context.pubsub) {
        context.pubsub.publish('Course', {
          Course: {
            mutation: 'UNLINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                course: args.course,
                subject: args.subject,
              },
              relation: 'subjects',
            },
          },
        });
      }

      return {
        course: source,
      };
    },
  ),
});
