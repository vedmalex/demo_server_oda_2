import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type StudentSubscription {
      mutation: MutationKind!
      node: Student!
      payload: StudentSubscriptionPayload
      updatedFields: [String]
      previous: UpdateStudentSubscriptionPayload
    }
  `,
});
