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
      removeFromSubjectBelongsToManyCourses(
        input: removeFromSubjectBelongsToManyCoursesInput
      ): removeFromSubjectBelongsToManyCoursesPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        subject?: string;
        course?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('removeFromSubjectBelongsToManyCourses');
      let subject = args.subject;
      let course = args.course;
      let payload = {
        subject,
        course,
      };
      await context.connectors.Subject.removeFromCourses(payload);

      let source = await context.connectors.Subject.findOneById(subject);

      if (context.pubsub) {
        context.pubsub.publish('Subject', {
          Subject: {
            mutation: 'UNLINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                subject: args.subject,
                course: args.course,
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
