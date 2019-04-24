import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    union MeetingSubscriptionPayload =
        UpdateMeetingSubscriptionPayload
      | MeetingBelongsToCreatedBySubscriptionPayload
      | MeetingBelongsToUpdateBySubscriptionPayload
  `,
  resolver: {
    __resolveType(obj, context, info) {
      if (
        obj.id ||
        obj.createdAt ||
        obj.updatedAt ||
        obj.removed ||
        obj.owner
      ) {
        return 'UpdateMeetingSubscriptionPayload';
      }
      if (obj.args && obj.args.meeting && obj.args.user) {
        return 'MeetingBelongsToCreatedBySubscriptionPayload';
      }
      if (obj.args && obj.args.meeting && obj.args.user) {
        return 'MeetingBelongsToUpdateBySubscriptionPayload';
      }
      return null;
    },
  },
});
