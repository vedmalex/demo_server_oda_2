import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    union GroupSubscriptionPayload =
        UpdateGroupSubscriptionPayload
      | GroupBelongsToCreatedBySubscriptionPayload
      | GroupBelongsToUpdateBySubscriptionPayload
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
        return 'UpdateGroupSubscriptionPayload';
      }
      if (obj.args && obj.args.group && obj.args.user) {
        return 'GroupBelongsToCreatedBySubscriptionPayload';
      }
      if (obj.args && obj.args.group && obj.args.user) {
        return 'GroupBelongsToUpdateBySubscriptionPayload';
      }
      return null;
    },
  },
});
