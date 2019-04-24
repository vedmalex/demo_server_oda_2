import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type CuratorSubscription {
      mutation: MutationKind!
      node: Curator!
      payload: CuratorSubscriptionPayload
      updatedFields: [String]
      previous: UpdateCuratorSubscriptionPayload
    }
  `,
});
