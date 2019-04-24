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
      addToGroupBelongsToCourse(
        input: addToGroupBelongsToCourseInput
      ): addToGroupBelongsToCoursePayload
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
      logger.trace('addToGroupBelongsToCourse');
      let group = args.group;
      let course = args.course;
      let payload = {
        group,
        course,
      };

      await context.connectors.Group.addToCourse(payload);

      let source = await context.connectors.Group.findOneById(group);

      if (context.pubsub) {
        context.pubsub.publish('Group', {
          Group: {
            mutation: 'LINK',
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
            mutation: 'LINK',
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
