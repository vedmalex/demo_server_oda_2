import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    union SubjectCourseSubscriptionPayload =
        UpdateSubjectCourseSubscriptionPayload
      | SubjectCourseBelongsToSubjectLinkSubscriptionPayload
      | SubjectCourseBelongsToCourseLinkSubscriptionPayload
  `,
  resolver: {
    __resolveType(obj, context, info) {
      if (
        obj.id ||
        obj.description ||
        obj.subject ||
        obj.course ||
        obj.hours ||
        obj.level
      ) {
        return 'UpdateSubjectCourseSubscriptionPayload';
      }
      if (obj.args && obj.args.subjectCourse && obj.args.subject) {
        return 'SubjectCourseBelongsToSubjectLinkSubscriptionPayload';
      }
      if (obj.args && obj.args.subjectCourse && obj.args.course) {
        return 'SubjectCourseBelongsToCourseLinkSubscriptionPayload';
      }
      return null;
    },
  },
});
