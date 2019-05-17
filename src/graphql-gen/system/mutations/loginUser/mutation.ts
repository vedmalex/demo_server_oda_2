import { Mutation, logger, mutateAndGetPayload } from '../../common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type Mutation {
      loginUser(input: loginUserInput!): loginUserPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        userName?: string;
        password?: string;
      },
      context,
      info,
    ) => {
      logger.trace('loginUser');
      let result: {
        // what must be in output
        token?: any; // string,
        role?: any; // string,
      };
      result = {};
      // put your code here
      return result;
    },
  ),
});
