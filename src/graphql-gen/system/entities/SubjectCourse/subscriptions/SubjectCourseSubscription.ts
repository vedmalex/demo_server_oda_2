import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type SubjectCourseSubscription {
      mutation: MutationKind!
      node: SubjectCourse!
      payload: SubjectCourseSubscriptionPayload
      updatedFields: [String]
      previous: UpdateSubjectCourseSubscriptionPayload
    }
  `,
});
