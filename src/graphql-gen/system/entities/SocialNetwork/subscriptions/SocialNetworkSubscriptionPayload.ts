import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type SocialNetworkSubscriptionPayload {
      id: ID
      account: String
      url: String
      type: SocialNetworkType
    }
  `,
});
