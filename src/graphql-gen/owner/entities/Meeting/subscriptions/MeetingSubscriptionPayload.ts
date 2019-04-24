import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    union MeetingSubscriptionPayload =
        UpdateMeetingSubscriptionPayload
      | MeetingBelongsToCuratorSubscriptionPayload
      | MeetingBelongsToGroupSubscriptionPayload
      | MeetingBelongsToManyStudentsSubscriptionPayload
  `,
  resolver: {
    __resolveType(obj, context, info) {
      if (obj.id || obj.date) {
        return 'UpdateMeetingSubscriptionPayload';
      }
      if (obj.args && obj.args.meeting && obj.args.curator) {
        return 'MeetingBelongsToCuratorSubscriptionPayload';
      }
      if (obj.args && obj.args.meeting && obj.args.group) {
        return 'MeetingBelongsToGroupSubscriptionPayload';
      }
      if (obj.args && obj.args.meeting && obj.args.student) {
        return 'MeetingBelongsToManyStudentsSubscriptionPayload';
      }
      return null;
    },
  },
});
