import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    union CuratorSubscriptionPayload =
        UpdateCuratorSubscriptionPayload
      | CuratorBelongsToCreatedBySubscriptionPayload
      | CuratorBelongsToUpdateBySubscriptionPayload
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
        return 'UpdateCuratorSubscriptionPayload';
      }
      if (obj.args && obj.args.curator && obj.args.user) {
        return 'CuratorBelongsToCreatedBySubscriptionPayload';
      }
      if (obj.args && obj.args.curator && obj.args.user) {
        return 'CuratorBelongsToUpdateBySubscriptionPayload';
      }
      return null;
    },
  },
});
