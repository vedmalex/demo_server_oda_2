import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
} from '../../../common';
import gql from 'graphql-tag';
import { PartialSocialNetwork } from '../../../data/SocialNetwork/types/model';
import { PartialPhone } from '../../../data/Phone/types/model';
import { PartialEmail } from '../../../data/Email/types/model';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      addToPersonHasManyAsStudents(
        input: addToPersonHasManyAsStudentsInput
      ): addToPersonHasManyAsStudentsPayload
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
      logger.trace('addToPersonHasManyAsStudents');
      let person = args.person;
      let student = args.student;
      let payload = {
        person,
        student,
      };

      await context.connectors.Person.addToAsStudents(payload);

      let source = await context.connectors.Person.findOneById(person);

      if (context.pubsub) {
        context.pubsub.publish('Person', {
          Person: {
            mutation: 'LINK',
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
