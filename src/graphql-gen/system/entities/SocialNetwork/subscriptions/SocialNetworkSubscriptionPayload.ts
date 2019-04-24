import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    union SocialNetworkSubscriptionPayload =
        UpdateSocialNetworkSubscriptionPayload
      | SocialNetworkBelongsToCreatedBySubscriptionPayload
      | SocialNetworkBelongsToUpdateBySubscriptionPayload
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
        return 'UpdateSocialNetworkSubscriptionPayload';
      }
      if (obj.args && obj.args.socialNetwork && obj.args.user) {
        return 'SocialNetworkBelongsToCreatedBySubscriptionPayload';
      }
      if (obj.args && obj.args.socialNetwork && obj.args.user) {
        return 'SocialNetworkBelongsToUpdateBySubscriptionPayload';
      }
      return null;
    },
  },
});
