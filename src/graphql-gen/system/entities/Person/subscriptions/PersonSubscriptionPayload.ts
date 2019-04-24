import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    union PersonSubscriptionPayload =
        UpdatePersonSubscriptionPayload
      | PersonBelongsToCreatedBySubscriptionPayload
      | PersonBelongsToUpdateBySubscriptionPayload
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
        return 'UpdatePersonSubscriptionPayload';
      }
      if (obj.args && obj.args.person && obj.args.user) {
        return 'PersonBelongsToCreatedBySubscriptionPayload';
      }
      if (obj.args && obj.args.person && obj.args.user) {
        return 'PersonBelongsToUpdateBySubscriptionPayload';
      }
      return null;
    },
  },
});
