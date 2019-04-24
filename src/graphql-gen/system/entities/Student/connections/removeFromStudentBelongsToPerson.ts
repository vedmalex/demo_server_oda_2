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
      removeFromStudentBelongsToPerson(
        input: removeFromStudentBelongsToPersonInput
      ): removeFromStudentBelongsToPersonPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        student?: string;
        person?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('removeFromStudentBelongsToPerson');
      let student = args.student;
      let person = args.person;
      let payload = {
        student,
        person,
      };
      await context.connectors.Student.removeFromPerson(payload);

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
                person: args.person,
              },
              relation: 'person',
            },
          },
        });

        let dest = await context.connectors.Person.findOneById(person);

        context.pubsub.publish('Person', {
          Person: {
            mutation: 'UNLINK',
            node: dest,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                student: args.student,
                person: args.person,
              },
              relation: 'asStudents',
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
