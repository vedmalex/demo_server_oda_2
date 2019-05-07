import { Type } from '../../../../common';
import gql from 'graphql-tag';

export default new Type({
  schema: gql`
    type deleteManyUserPayload {
      deletedItemId: ID
      user: User
    }
  `,
});
