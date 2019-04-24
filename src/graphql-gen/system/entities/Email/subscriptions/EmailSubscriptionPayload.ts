import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    union EmailSubscriptionPayload =
        UpdateEmailSubscriptionPayload
      | EmailBelongsToCreatedBySubscriptionPayload
      | EmailBelongsToUpdateBySubscriptionPayload
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
        return 'UpdateEmailSubscriptionPayload';
      }
      if (obj.args && obj.args.email && obj.args.user) {
        return 'EmailBelongsToCreatedBySubscriptionPayload';
      }
      if (obj.args && obj.args.email && obj.args.user) {
        return 'EmailBelongsToUpdateBySubscriptionPayload';
      }
      return null;
    },
  },
});
