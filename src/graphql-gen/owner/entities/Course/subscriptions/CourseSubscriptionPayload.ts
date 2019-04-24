import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    union CourseSubscriptionPayload =
        UpdateCourseSubscriptionPayload
      | CourseBelongsToManySubjectsSubscriptionPayload
      | CourseHasManyGroupsSubscriptionPayload
  `,
  resolver: {
    __resolveType(obj, context, info) {
      if (obj.id || obj.name) {
        return 'UpdateCourseSubscriptionPayload';
      }
      if (obj.args && obj.args.course && obj.args.subject) {
        return 'CourseBelongsToManySubjectsSubscriptionPayload';
      }
      if (obj.args && obj.args.course && obj.args.group) {
        return 'CourseHasManyGroupsSubscriptionPayload';
      }
      return null;
    },
  },
});
