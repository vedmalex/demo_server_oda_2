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
      addToSubjectBelongsToManyCourses(
        input: addToSubjectBelongsToManyCoursesInput
      ): addToSubjectBelongsToManyCoursesPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        subject?: string;
        course?: string;
        hours?: number;
        level?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('addToSubjectBelongsToManyCourses');
      let subject = args.subject;
      let course = args.course;
      let payload = {
        subject,
        course,
        hours: args.hours,
        level: args.level,
      };

      await context.connectors.Subject.addToCourses(payload);

      let source = await context.connectors.Subject.findOneById(subject);

      if (context.pubsub) {
        context.pubsub.publish('Subject', {
          Subject: {
            mutation: 'LINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                subject: args.subject,
                course: args.course,
                hours: args.hours,
                level: args.level,
              },
              relation: 'course',
            },
          },
        });
      }
      return {
        subject: source,
      };
    },
  ),
});
