import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type UserSubscriptionPayload {
      id: ID
      userName: String
      password: String
      isAdmin: Boolean
      isSystem: Boolean
      enabled: Boolean
    }
  `,
});
