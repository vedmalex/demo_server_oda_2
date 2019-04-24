import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    union PhoneSubscriptionPayload =
        UpdatePhoneSubscriptionPayload
      | PhoneBelongsToCreatedBySubscriptionPayload
      | PhoneBelongsToUpdateBySubscriptionPayload
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
        return 'UpdatePhoneSubscriptionPayload';
      }
      if (obj.args && obj.args.phone && obj.args.user) {
        return 'PhoneBelongsToCreatedBySubscriptionPayload';
      }
      if (obj.args && obj.args.phone && obj.args.user) {
        return 'PhoneBelongsToUpdateBySubscriptionPayload';
      }
      return null;
    },
  },
});
