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
      removeFromPersonHasManyAsStudents(
        input: removeFromPersonHasManyAsStudentsInput
      ): removeFromPersonHasManyAsStudentsPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        person?: string;
        student?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('removeFromPersonHasManyAsStudents');
      let person = args.person;
      let student = args.student;
      let payload = {
        person,
        student,
      };
      await context.connectors.Person.removeFromAsStudents(payload);

      let source = await context.connectors.Person.findOneById(person);

      if (context.pubsub) {
        context.pubsub.publish('Person', {
          Person: {
            mutation: 'UNLINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                person: args.person,
                student: args.student,
              },
              relation: 'asStudents',
            },
          },
        });
      }

      return {
        person: source,
      };
    },
  ),
});
