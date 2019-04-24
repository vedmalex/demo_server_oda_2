import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
  ensurePerson,
  unlinkEmailFromPerson,
  linkEmailToPerson,
} from '../../../../common';
import gql from 'graphql-tag';
import { merge } from 'lodash';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      updateEmail(input: updateEmailInput!): updateEmailPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        email?: string;
        type?: string;
        person?: object /*Person*/;
        personUnlink?: object /*Person*/;
        personCreate?: object /*Person*/;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('updateEmail');
      let payload = context.connectors.Email.getPayload(args);

      let result;
      let previous;

      if (args.id) {
        previous = await context.connectors.Email.findOneById(args.id);
        result = await context.connectors.Email.findOneByIdAndUpdate(
          args.id,
          merge({}, previous, payload),
        );
      } else if (args.email) {
        delete payload.email;
        previous = await context.connectors.Email.findOneByEmail(args.email);
        result = await context.connectors.Email.findOneByEmailAndUpdate(
          args.email,
          merge({}, previous, payload),
        );
      }

      if (!result) {
        throw new Error('item of type Email is not found for update');
      }

      if (context.pubsub) {
        context.pubsub.publish('Email', {
          Email: {
            mutation: 'UPDATE',
            node: result,
            previous,
            updatedFields: Object.keys(payload).filter(
              f => payload[f] !== undefined,
            ),
            payload: args,
          },
        });
      }

      if (args.personUnlink) {
        let $item = args.personUnlink;
        if ($item) {
          let person = await ensurePerson({
            args: $item,
            context,
            create: false,
          });
          await unlinkEmailFromPerson({
            context,
            person,
            email: result,
          });
        }
      }

      if (args.personCreate) {
        let $item = args.personCreate as { id };
        if ($item) {
          let person = await ensurePerson({
            args: $item,
            context,
            create: true,
          });

          await linkEmailToPerson({
            context,
            person,
            email: result,
          });
        }
      }

      if (args.person) {
        let $item = args.person as { id };
        if ($item) {
          let person = await ensurePerson({
            args: $item,
            context,
            create: false,
          });

          await linkEmailToPerson({
            context,
            person,
            email: result,
          });
        }
      }

      return {
        email: result,
      };
    },
  ),
});
