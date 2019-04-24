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
      removeFromStudentBelongsToUpdateBy(
        input: removeFromStudentBelongsToUpdateByInput
      ): removeFromStudentBelongsToUpdateByPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        student?: string;
        user?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('removeFromStudentBelongsToUpdateBy');
      let student = args.student;
      let user = args.user;
      let payload = {
        student,
        user,
      };
      await context.connectors.Student.removeFromUpdateBy(payload);

      let source = await context.connectors.Student.findOneById(student);

      if (context.pubsub) {
        context.pubsub.publish('Student', {
          Student: {
            mutation: 'UNLINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                student: args.student,
                user: args.user,
              },
              relation: 'updateBy',
            },
          },
        });
      }

      return {
        student: source,
      };
    },
  ),
});
