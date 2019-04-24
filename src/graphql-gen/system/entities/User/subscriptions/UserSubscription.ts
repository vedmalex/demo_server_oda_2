import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type UserSubscription {
      mutation: MutationKind!
      node: User!
      payload: UserSubscriptionPayload
      updatedFields: [String]
      previous: UserSubscriptionPayload
    }
  `,
});
