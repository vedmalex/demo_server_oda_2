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
      addToSubjectCourseBelongsToUpdateBy(
        input: addToSubjectCourseBelongsToUpdateByInput
      ): addToSubjectCourseBelongsToUpdateByPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        subjectCourse?: string;
        user?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('addToSubjectCourseBelongsToUpdateBy');
      let subjectCourse = args.subjectCourse;
      let user = args.user;
      let payload = {
        subjectCourse,
        user,
      };

      await context.connectors.SubjectCourse.addToUpdateBy(payload);

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
                user: args.user,
              },
              relation: 'updateBy',
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
