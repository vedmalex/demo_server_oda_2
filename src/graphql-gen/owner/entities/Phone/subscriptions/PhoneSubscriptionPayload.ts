import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    union PhoneSubscriptionPayload =
        UpdatePhoneSubscriptionPayload
      | PhoneBelongsToPersonSubscriptionPayload
  `,
  resolver: {
    __resolveType(obj, context, info) {
      if (obj.id || obj.phoneNumber || obj.type) {
        return 'UpdatePhoneSubscriptionPayload';
      }
      if (obj.args && obj.args.phone && obj.args.person) {
        return 'PhoneBelongsToPersonSubscriptionPayload';
      }
      return null;
    },
  },
});
