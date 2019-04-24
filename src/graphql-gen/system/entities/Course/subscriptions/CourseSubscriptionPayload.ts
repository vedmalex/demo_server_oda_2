import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    union CourseSubscriptionPayload =
        UpdateCourseSubscriptionPayload
      | CourseBelongsToCreatedBySubscriptionPayload
      | CourseBelongsToUpdateBySubscriptionPayload
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
        return 'UpdateCourseSubscriptionPayload';
      }
      if (obj.args && obj.args.course && obj.args.user) {
        return 'CourseBelongsToCreatedBySubscriptionPayload';
      }
      if (obj.args && obj.args.course && obj.args.user) {
        return 'CourseBelongsToUpdateBySubscriptionPayload';
      }
      return null;
    },
  },
});
