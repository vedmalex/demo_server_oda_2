import {
  logger,
  RegisterConnectors,
  mutateAndGetPayload,
  PubSubEngine,
  Mutation,
} from '../../../../common';
import gql from 'graphql-tag';
import { merge } from 'lodash';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
      updatePhone(input: updatePhoneInput!): updatePhonePayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        phoneNumber?: string;
        type?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('updatePhone');
      let payload = context.connectors.Phone.getPayload(args);

      let result;
      let previous;

      if (args.id) {
        previous = await context.connectors.Phone.findOneById(args.id);
        result = await context.connectors.Phone.findOneByIdAndUpdate(
          args.id,
          merge({}, previous, payload),
        );
      } else if (args.phoneNumber) {
        delete payload.phoneNumber;
        previous = await context.connectors.Phone.findOneByPhoneNumber(
          args.phoneNumber,
        );
        result = await context.connectors.Phone.findOneByPhoneNumberAndUpdate(
          args.phoneNumber,
          merge({}, previous, payload),
        );
      }

      if (!result) {
        throw new Error('item of type Phone is not found for update');
      }

      if (context.pubsub) {
        context.pubsub.publish('Phone', {
          Phone: {
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

      return {
        phone: result,
      };
    },
  ),
});
