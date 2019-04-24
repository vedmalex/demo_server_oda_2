import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type StudentBelongsToManyMeetingsSubscriptionPayload {
      args: StudentBelongsToManyMeetingsArgsSubscriptionPayload
      relation: String
    }
  `,
});
