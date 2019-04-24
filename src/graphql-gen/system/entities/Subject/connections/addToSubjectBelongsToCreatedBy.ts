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
      addToSubjectBelongsToCreatedBy(
        input: addToSubjectBelongsToCreatedByInput
      ): addToSubjectBelongsToCreatedByPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        subject?: string;
        user?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('addToSubjectBelongsToCreatedBy');
      let subject = args.subject;
      let user = args.user;
      let payload = {
        subject,
        user,
      };

      await context.connectors.Subject.addToCreatedBy(payload);

      let source = await context.connectors.Subject.findOneById(subject);

      if (context.pubsub) {
        context.pubsub.publish('Subject', {
          Subject: {
            mutation: 'LINK',
            node: source,
            previous: null,
            updatedFields: [],
            payload: {
              args: {
                subject: args.subject,
                user: args.user,
              },
              relation: 'createdBy',
            },
          },
        });
      }
      return {
        subject: source,
      };
    },
  ),
});
