import { SystemGraphQL } from '../runQuery';
import gql from 'graphql-tag';

export const getUser = (id: string) => {
  return SystemGraphQL.query({
    query: gql`
      query getUser($userId: ID) {
        user(id: $userId) {
          id
          userName
          enabled
          isAdmin
          isSystem
        }
      }
    `,
    variables: {
      userId: id
    }
  })
    .then(result => {
      if (result.data) {
        return result.data.user;
      }
    })
    .catch(e => {
      throw e;
    });
};
