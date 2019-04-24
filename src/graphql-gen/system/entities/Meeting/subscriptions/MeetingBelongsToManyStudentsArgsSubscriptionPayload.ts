import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type MeetingBelongsToManyStudentsArgsSubscriptionPayload {
      meeting: ID!
      student: ID!
      #additional Edge fields
      present: Boolean
      specialNotes: String
      superpuper: String
    }
  `,
});
