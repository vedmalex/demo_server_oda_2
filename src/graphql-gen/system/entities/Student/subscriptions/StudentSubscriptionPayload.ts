import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    union StudentSubscriptionPayload =
        UpdateStudentSubscriptionPayload
      | StudentBelongsToCreatedBySubscriptionPayload
      | StudentBelongsToUpdateBySubscriptionPayload
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
        return 'UpdateStudentSubscriptionPayload';
      }
      if (obj.args && obj.args.student && obj.args.user) {
        return 'StudentBelongsToCreatedBySubscriptionPayload';
      }
      if (obj.args && obj.args.student && obj.args.user) {
        return 'StudentBelongsToUpdateBySubscriptionPayload';
      }
      return null;
    },
  },
});
