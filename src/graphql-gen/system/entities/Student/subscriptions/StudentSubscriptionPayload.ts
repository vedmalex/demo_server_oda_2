import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    union StudentSubscriptionPayload =
        UpdateStudentSubscriptionPayload
      | StudentBelongsToPersonSubscriptionPayload
      | StudentBelongsToGroupSubscriptionPayload
      | StudentBelongsToManyMeetingsSubscriptionPayload
  `,
  resolver: {
    __resolveType(obj, context, info) {
      if (obj.id) {
        return 'UpdateStudentSubscriptionPayload';
      }
      if (obj.args && obj.args.student && obj.args.person) {
        return 'StudentBelongsToPersonSubscriptionPayload';
      }
      if (obj.args && obj.args.student && obj.args.group) {
        return 'StudentBelongsToGroupSubscriptionPayload';
      }
      if (obj.args && obj.args.student && obj.args.meeting) {
        return 'StudentBelongsToManyMeetingsSubscriptionPayload';
      }
      return null;
    },
  },
});
