import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type GroupSubscription {
      mutation: MutationKind!
      node: Group!
      payload: GroupSubscriptionPayload
      updatedFields: [String]
      previous: UpdateGroupSubscriptionPayload
    }
  `,
});
