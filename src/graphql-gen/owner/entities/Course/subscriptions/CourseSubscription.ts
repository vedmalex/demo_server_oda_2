import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type CourseSubscription {
      mutation: MutationKind!
      node: Course!
      payload: CourseSubscriptionPayload
      updatedFields: [String]
      previous: UpdateCourseSubscriptionPayload
    }
  `,
});
