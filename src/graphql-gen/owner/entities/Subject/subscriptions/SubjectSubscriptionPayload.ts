import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    union SubjectSubscriptionPayload =
        UpdateSubjectSubscriptionPayload
      | SubjectBelongsToManyCoursesSubscriptionPayload
  `,
  resolver: {
    __resolveType(obj, context, info) {
      if (obj.id || obj.name) {
        return 'UpdateSubjectSubscriptionPayload';
      }
      if (obj.args && obj.args.subject && obj.args.course) {
        return 'SubjectBelongsToManyCoursesSubscriptionPayload';
      }
      return null;
    },
  },
});
