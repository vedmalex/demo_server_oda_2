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
      updateUser(input: updateUserInput!): updateUserPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        id?: string;
        userName?: string;
      },
      context: { connectors: RegisterConnectors; pubsub: PubSubEngine },
      info,
    ) => {
      logger.trace('updateUser');
      let payload = context.connectors.User.getPayload(args);

      let result;
      let previous;

      if (args.id) {
        previous = await context.connectors.User.findOneById(args.id);
        result = await context.connectors.User.findOneByIdAndUpdate(
          args.id,
          merge({}, previous, payload),
        );
      } else if (args.userName) {
        delete payload.userName;
        previous = await context.connectors.User.findOneByUserName(
          args.userName,
        );
        result = await context.connectors.User.findOneByUserNameAndUpdate(
          args.userName,
          merge({}, previous, payload),
        );
      }

      if (!result) {
        throw new Error('item of type User is not found for update');
      }

      if (context.pubsub) {
        context.pubsub.publish('User', {
          User: {
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
        user: result,
      };
    },
  ),
});
