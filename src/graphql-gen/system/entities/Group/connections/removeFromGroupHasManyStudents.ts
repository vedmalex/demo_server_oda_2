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
      removeFromGroupHasManyStudents(
        input: removeFromGroupHasManyStudentsInput
      ): removeFromGroupHasManyStudentsPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        group?: string;
        student?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('removeFromGroupHasManyStudents');
      let group = args.group;
      let student = args.student;
      let payload = {
        group,
        student,
      };
      await context.connectors.Group.removeFromStudents(payload);

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
                student: args.student,
              },
              relation: 'students',
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
