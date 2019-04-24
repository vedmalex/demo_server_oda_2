import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type SubjectBelongsToManyCoursesArgsSubscriptionPayload {
      subject: ID!
      course: ID!
      #additional Edge fields
      hours: Float
      level: String
    }
  `,
});
