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
      addToSubjectCourseBelongsToSubjectLink(
        input: addToSubjectCourseBelongsToSubjectLinkInput
      ): addToSubjectCourseBelongsToSubjectLinkPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        subjectCourse?: string;
        subject?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('addToSubjectCourseBelongsToSubjectLink');
      let subjectCourse = args.subjectCourse;
      let subject = args.subject;
      let payload = {
        subjectCourse,
        subject,
      };

      await context.connectors.SubjectCourse.addToSubjectLink(payload);

      let source = await context.connectors.SubjectCourse.findOneById(
        subjectCourse,
      );

      if (context.pubsub) {
        context.pubsub.publish('SubjectCourse', {
          SubjectCourse: {
            mutation: 'LINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                subjectCourse: args.subjectCourse,
                subject: args.subject,
              },
              relation: 'subjectLink',
            },
          },
        });
      }
      return {
        subjectCourse: source,
      };
    },
  ),
});
