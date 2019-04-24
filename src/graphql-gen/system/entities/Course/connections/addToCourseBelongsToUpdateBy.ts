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
      addToCourseBelongsToUpdateBy(
        input: addToCourseBelongsToUpdateByInput
      ): addToCourseBelongsToUpdateByPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        course?: string;
        user?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('addToCourseBelongsToUpdateBy');
      let course = args.course;
      let user = args.user;
      let payload = {
        course,
        user,
      };

      await context.connectors.Course.addToUpdateBy(payload);

      let source = await context.connectors.Course.findOneById(course);

      if (context.pubsub) {
        context.pubsub.publish('Course', {
          Course: {
            mutation: 'LINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                course: args.course,
                user: args.user,
              },
              relation: 'updateBy',
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
