import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    union CuratorSubscriptionPayload =
        UpdateCuratorSubscriptionPayload
      | CuratorBelongsToPersonSubscriptionPayload
      | CuratorHasManyGroupsSubscriptionPayload
  `,
  resolver: {
    __resolveType(obj, context, info) {
      if (obj.id) {
        return 'UpdateCuratorSubscriptionPayload';
      }
      if (obj.args && obj.args.curator && obj.args.person) {
        return 'CuratorBelongsToPersonSubscriptionPayload';
      }
      if (obj.args && obj.args.curator && obj.args.group) {
        return 'CuratorHasManyGroupsSubscriptionPayload';
      }
      return null;
    },
  },
});
