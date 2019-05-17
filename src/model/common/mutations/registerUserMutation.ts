import getLogger from 'oda-logger';
let logger = getLogger('graphql:register:');

import {
  Mutation,
  Input,
  Schema,
  Type,
  mutateAndGetPayload
} from '../../../graphql-gen/system/common';
import gql from 'graphql-tag';

export const registerUserInput = new Input({
  schema: gql`
    input registerUserInput {
      userName: String!
      password: String!
    }
  `
});

export const registerUserPayload = new Type({
  schema: gql`
    type registerUserPayload {
      token: String
      role: String
      message: String
    }
  `
});

export const registerUserMutation = new Mutation({
  schema: gql`
    type Mutation {
      registerUser(input: registerUserInput!): registerUserPayload
    }
  `,
  resolver: mutateAndGetPayload(
    async (
      args: {
        userName?: string;
        password?: string;
      },
      context,
      info
    ) => {
      debugger;
      logger.trace('registerUser');
      let message;
      let result: {
        // what must be in output
        token?: any; // string,
        message?: any;
        role?: any;
      } = {};

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
            userName: args.userName
          }
        })
        .then(r => {
          if (r.data) {
            return r.data.user;
          }
        })
        .catch(e => {
          result.message = e.toString();
        });

      if (user) {
        result.message = 'user already exists';
      } else {
        let newUser = await context
          .systemGQL({
            query: gql`
              mutation createUser($userName: String!, $password: String!) {
                createUser(
                  input: {
                    userName: $userName
                    password: $password
                    enabled: true
                  }
                ) {
                  user {
                    node {
                      userName
                      enabled
                    }
                  }
                }
              }
            `,
            variables: {
              userName: args.userName,
              password: args.password
            }
          })
          .then(r => {
            debugger;
            if (r.data && r.data.createUser) {
              return r.data.createUser.user.node;
            }
          })
          .catch(e => {
            result.message = e.toString();
          });

        if (newUser && !newUser.enabled) {
          result.message = 'wait for sysadmin review';
        }

        if (newUser.enabled) {
          let loginUserToken = await context
            .systemGQL({
              query: gql`
                mutation loginUser($userName: String!, $password: String!) {
                  loginUser(
                    input: { userName: $userName, password: $password }
                  ) {
                    token
                  }
                }
              `,
              variables: {
                userName: args.userName,
                password: args.password
              }
            })
            .then(r => {
              if (r.data && r.data.loginUser) {
                return r.data.loginUser.token;
              }
            })
            .catch(e => {
              message = e.toString();
            });
          if (loginUserToken) {
            result.token = loginUserToken;
            result.role = context.userGroup || 'public';
            result.message = 'success';
          } else {
            result.message = message;
          }
        }
      }
      return result;
    }
  )
});

export default new Schema({
  name: 'RegisterUser.mutation',
  items: [registerUserMutation, registerUserInput, registerUserPayload]
});
