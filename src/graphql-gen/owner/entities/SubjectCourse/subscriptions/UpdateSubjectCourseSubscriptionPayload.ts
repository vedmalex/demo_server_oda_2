import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type UpdateSubjectCourseSubscriptionPayload {
      id: ID
      description: String
      subject: String
      course: String
      hours: Float
      level: String
    }
  `,
});
