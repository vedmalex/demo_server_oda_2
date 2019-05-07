import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type EmailSubscription {
      mutation: MutationKind!
      node: Email!
      payload: EmailSubscriptionPayload
      updatedFields: [String]
      previous: EmailSubscriptionPayload
    }
  `,
});
