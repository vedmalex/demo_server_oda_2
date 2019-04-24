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
      removeFromStudentBelongsToGroup(
        input: removeFromStudentBelongsToGroupInput
      ): removeFromStudentBelongsToGroupPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        student?: string;
        group?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('removeFromStudentBelongsToGroup');
      let student = args.student;
      let group = args.group;
      let payload = {
        student,
        group,
      };
      await context.connectors.Student.removeFromGroup(payload);

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
                group: args.group,
              },
              relation: 'group',
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
                student: args.student,
                group: args.group,
              },
              relation: 'students',
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
