import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  ensureUser,
  linkCourseToCreatedBy,
  linkCourseToUpdateBy,
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
        createdAt?: Date;
        updatedAt?: Date;
        removed?: boolean;
        owner?: string;
        createdBy?: object /*User*/;
        updateBy?: object /*User*/;
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

      if (args.createdBy) {
        let $item = args.createdBy as { id };
        if ($item) {
          let createdBy = await ensureUser({
            args: $item,
            context,
            create: true,
          });
          await linkCourseToCreatedBy({
            context,
            createdBy,
            course: result,
          });
        }
      }

      if (args.updateBy) {
        let $item = args.updateBy as { id };
        if ($item) {
          let updateBy = await ensureUser({
            args: $item,
            context,
            create: true,
          });
          await linkCourseToUpdateBy({
            context,
            updateBy,
            course: result,
          });
        }
      }

      return {
        course: courseEdge,
      };
    },
  ),
});
