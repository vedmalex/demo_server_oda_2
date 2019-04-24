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
      removeFromSubjectCourseBelongsToSubjectLink(
        input: removeFromSubjectCourseBelongsToSubjectLinkInput
      ): removeFromSubjectCourseBelongsToSubjectLinkPayload
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
      logger.trace('removeFromSubjectCourseBelongsToSubjectLink');
      let subjectCourse = args.subjectCourse;
      let subject = args.subject;
      let payload = {
        subjectCourse,
        subject,
      };
      await context.connectors.SubjectCourse.removeFromSubjectLink(payload);

      let source = await context.connectors.SubjectCourse.findOneById(
        subjectCourse,
      );

      if (context.pubsub) {
        context.pubsub.publish('SubjectCourse', {
          SubjectCourse: {
            mutation: 'UNLINK',
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
