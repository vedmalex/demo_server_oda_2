import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type PhoneSubscription {
      mutation: MutationKind!
      node: Phone!
      payload: PhoneSubscriptionPayload
      updatedFields: [String]
      previous: PhoneSubscriptionPayload
    }
  `,
});
