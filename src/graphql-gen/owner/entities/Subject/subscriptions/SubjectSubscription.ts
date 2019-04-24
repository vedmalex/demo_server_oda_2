import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type SubjectSubscription {
      mutation: MutationKind!
      node: Subject!
      payload: SubjectSubscriptionPayload
      updatedFields: [String]
      previous: UpdateSubjectSubscriptionPayload
    }
  `,
});
