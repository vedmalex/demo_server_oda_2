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
      removeFromGroupBelongsToCourse(
        input: removeFromGroupBelongsToCourseInput
      ): removeFromGroupBelongsToCoursePayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        group?: string;
        course?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('removeFromGroupBelongsToCourse');
      let group = args.group;
      let course = args.course;
      let payload = {
        group,
        course,
      };
      await context.connectors.Group.removeFromCourse(payload);

      let source = await context.connectors.Group.findOneById(group);

      if (context.pubsub) {
        context.pubsub.publish('Group', {
          Group: {
            mutation: 'UNLINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                group: args.group,
                course: args.course,
              },
              relation: 'course',
            },
          },
        });

        let dest = await context.connectors.Course.findOneById(course);

        context.pubsub.publish('Course', {
          Course: {
            mutation: 'UNLINK',
            node: dest,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                group: args.group,
                course: args.course,
              },
              relation: 'groups',
            },
          },
        });
      }

      return {
        group: source,
      };
    },
  ),
});
