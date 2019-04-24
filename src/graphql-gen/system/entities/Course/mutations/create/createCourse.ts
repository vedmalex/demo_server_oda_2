import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  ensureSubject,
  linkCourseToSubjects,
  ensureGroup,
  linkCourseToGroups,
} from '../../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      createCourse(input: createCourseInput!): createCoursePayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        name?: string;
        subjects?: object /*Subject*/[];
        groups?: object /*Group*/[];
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('createCourse');
      let create = context.connectors.Course.getPayload(args, false);

      let result = await context.connectors.Course.create(create);

      if (context.pubsub) {
        context.pubsub.publish('Course', {
          Course: {
            mutation: 'CREATE',
            node: result,
            previous: null,
            updatedFields: [],
            payload: args,
          },
        });
      }

      let courseEdge = {
        cursor: result.id,
        node: result,
      };

      if (
        args.subjects &&
        Array.isArray(args.subjects) &&
        args.subjects.length > 0
      ) {
        for (let i = 0, len = args.subjects.length; i < len; i++) {
          let $item = args.subjects[i] as { id };
          if ($item) {
            let subjects = await ensureSubject({
              args: $item,
              context,
              create: true,
            });
            await linkCourseToSubjects({
              context,
              subjects,
              course: result,
            });
          }
        }
      }

      if (args.groups && Array.isArray(args.groups) && args.groups.length > 0) {
        for (let i = 0, len = args.groups.length; i < len; i++) {
          let $item = args.groups[i] as { id };
          if ($item) {
            let groups = await ensureGroup({
              args: $item,
              context,
              create: true,
            });
            await linkCourseToGroups({
              context,
              groups,
              course: result,
            });
          }
        }
      }

      return {
        course: courseEdge,
      };
    },
  ),
});
