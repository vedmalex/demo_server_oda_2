import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type PersonSubscription {
      mutation: MutationKind!
      node: Person!
      payload: PersonSubscriptionPayload
      updatedFields: [String]
      previous: UpdatePersonSubscriptionPayload
    }
  `,
});
