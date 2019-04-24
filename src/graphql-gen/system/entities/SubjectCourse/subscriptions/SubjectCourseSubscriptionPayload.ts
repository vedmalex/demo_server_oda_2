import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    union SubjectCourseSubscriptionPayload =
        UpdateSubjectCourseSubscriptionPayload
      | SubjectCourseBelongsToCreatedBySubscriptionPayload
      | SubjectCourseBelongsToUpdateBySubscriptionPayload
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
        return 'UpdateSubjectCourseSubscriptionPayload';
      }
      if (obj.args && obj.args.subjectCourse && obj.args.user) {
        return 'SubjectCourseBelongsToCreatedBySubscriptionPayload';
      }
      if (obj.args && obj.args.subjectCourse && obj.args.user) {
        return 'SubjectCourseBelongsToUpdateBySubscriptionPayload';
      }
      return null;
    },
  },
});
