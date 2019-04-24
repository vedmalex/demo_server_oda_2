import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    union GroupSubscriptionPayload =
        UpdateGroupSubscriptionPayload
      | GroupBelongsToCourseSubscriptionPayload
      | GroupHasManyStudentsSubscriptionPayload
      | GroupBelongsToCuratorSubscriptionPayload
  `,
  resolver: {
    __resolveType(obj, context, info) {
      if (obj.id || obj.name) {
        return 'UpdateGroupSubscriptionPayload';
      }
      if (obj.args && obj.args.group && obj.args.course) {
        return 'GroupBelongsToCourseSubscriptionPayload';
      }
      if (obj.args && obj.args.group && obj.args.student) {
        return 'GroupHasManyStudentsSubscriptionPayload';
      }
      if (obj.args && obj.args.group && obj.args.curator) {
        return 'GroupBelongsToCuratorSubscriptionPayload';
      }
      return null;
    },
  },
});
