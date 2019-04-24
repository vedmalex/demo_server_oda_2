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
      removeFromCourseHasManyGroups(
        input: removeFromCourseHasManyGroupsInput
      ): removeFromCourseHasManyGroupsPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        course?: string;
        group?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('removeFromCourseHasManyGroups');
      let course = args.course;
      let group = args.group;
      let payload = {
        course,
        group,
      };
      await context.connectors.Course.removeFromGroups(payload);

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
                group: args.group,
              },
              relation: 'groups',
            },
          },
        });

        let dest = await context.connectors.Group.findOneById(group);

        context.pubsub.publish('Group', {
          Group: {
            mutation: 'UNLINK',
            node: dest,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                course: args.course,
                group: args.group,
              },
              relation: 'course',
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
