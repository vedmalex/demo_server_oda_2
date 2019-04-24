import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  ensureCourse,
  linkSubjectToCourse,
} from '../../../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      createSubject(input: createSubjectInput!): createSubjectPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        name?: string;
        course?: object /*Course*/[];
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('createSubject');
      let create = context.connectors.Subject.getPayload(args, false);

      let result = await context.connectors.Subject.create(create);

      if (context.pubsub) {
        context.pubsub.publish('Subject', {
          Subject: {
            mutation: 'CREATE',
            node: result,
            previous: null,
            updatedFields: [],
            payload: args,
          },
        });
      }

      let subjectEdge = {
        cursor: result.id,
        node: result,
      };

      if (args.course && Array.isArray(args.course) && args.course.length > 0) {
        for (let i = 0, len = args.course.length; i < len; i++) {
          let $item = args.course[i] as { id; hours; level };
          if ($item) {
            let course = await ensureCourse({
              args: $item,
              context,
              create: true,
            });
            await linkSubjectToCourse({
              context,
              course,
              subject: result,
              hours: $item.hours,
              level: $item.level,
            });
          }
        }
      }

      return {
        subject: subjectEdge,
      };
    },
  ),
});
