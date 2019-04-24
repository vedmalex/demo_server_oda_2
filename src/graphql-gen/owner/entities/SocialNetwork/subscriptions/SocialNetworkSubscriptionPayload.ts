import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    union SocialNetworkSubscriptionPayload =
        UpdateSocialNetworkSubscriptionPayload
      | SocialNetworkBelongsToPersonSubscriptionPayload
  `,
  resolver: {
    __resolveType(obj, context, info) {
      if (obj.id || obj.account || obj.url || obj.type) {
        return 'UpdateSocialNetworkSubscriptionPayload';
      }
      if (obj.args && obj.args.socialNetwork && obj.args.person) {
        return 'SocialNetworkBelongsToPersonSubscriptionPayload';
      }
      return null;
    },
  },
});
