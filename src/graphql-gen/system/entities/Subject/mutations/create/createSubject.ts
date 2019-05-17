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
    extend type Mutation {
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

      let resActions = [];
      if (args.course && Array.isArray(args.course) && args.course.length > 0) {
        for (let i = 0, len = args.course.length; i < len; i++) {
          let $item = args.course[i] as { id; hours; level };
          if ($item) {
            resActions.push(async () => {
              let course = await ensureCourse({
                args: $item,
                context,
                create: true,
              });
              if (course) {
                return linkSubjectToCourse({
                  context,
                  course,
                  subject: result,
                  hours: $item.hours,
                  level: $item.level,
                });
              } else {
                const err = `can't linkSubjectToCourse item not created`;
                logger.error(err);
                throw new Error(err);
              }
            });
          }
        }
      }
      if (resActions.length > 0) {
        await Promise.all(resActions);
      }

      return {
        subject: subjectEdge,
      };
    },
  ),
});
