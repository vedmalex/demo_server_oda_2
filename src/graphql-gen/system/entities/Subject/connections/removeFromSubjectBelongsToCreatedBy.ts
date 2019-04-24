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
      removeFromSubjectBelongsToCreatedBy(
        input: removeFromSubjectBelongsToCreatedByInput
      ): removeFromSubjectBelongsToCreatedByPayload
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
      logger.trace('removeFromSubjectBelongsToCreatedBy');
      let subject = args.subject;
      let user = args.user;
      let payload = {
        subject,
        user,
      };
      await context.connectors.Subject.removeFromCreatedBy(payload);

      let source = await context.connectors.Subject.findOneById(subject);

      if (context.pubsub) {
        context.pubsub.publish('Subject', {
          Subject: {
            mutation: 'UNLINK',
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
