import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type SocialNetworkSubscription {
      mutation: MutationKind!
      node: SocialNetwork!
      payload: SocialNetworkSubscriptionPayload
      updatedFields: [String]
      previous: SocialNetworkSubscriptionPayload
    }
  `,
});
