import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    type SubjectCourseBelongsToCourseLinkSubscriptionPayload {
      args: SubjectCourseBelongsToCourseLinkArgsSubscriptionPayload
      relation: String
    }
  `,
});
