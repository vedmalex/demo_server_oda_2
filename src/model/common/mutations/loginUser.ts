import { passport } from 'oda-api-common';
import { getAcl } from './../../resolvers/acl';

import {
  Mutation,
  mutateAndGetPayload,
} from '../../../graphql-gen/system/common';
import gql from 'graphql-tag';

export default new Mutation({
  schema: gql`
    extend type RootMutation {
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
      debugger;
      let result: {
        token?: string;
        role: string;
      };

      let user = await context
        .systemGQL({
          query: gql`
            query getUser($userName: String) {
              user(userName: $userName) {
                id
                userName
                password
                enabled
                isAdmin
                isSystem
              }
            }
          `,
          variables: {
            userName: args.userName,
          },
        })
        .then(r => {
          if (r.data) {
            return r.data.user;
          }
        })
        .catch(e => {
          throw e;
        });

      if (!user || (user && !user.enabled)) {
        throw new Error('Login Error');
      }

      // password didn't stored in open way
      let { salt, hash } = JSON.parse(user.password);
      result = {
        token: await passport.loginBearer(user.id, args.password, salt, hash),
        role: (await getAcl(user.id)) || 'public',
      };

      return result;
    },
  ),
});
