import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    union SubjectSubscriptionPayload =
        UpdateSubjectSubscriptionPayload
      | SubjectBelongsToCreatedBySubscriptionPayload
      | SubjectBelongsToUpdateBySubscriptionPayload
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
        return 'UpdateSubjectSubscriptionPayload';
      }
      if (obj.args && obj.args.subject && obj.args.user) {
        return 'SubjectBelongsToCreatedBySubscriptionPayload';
      }
      if (obj.args && obj.args.subject && obj.args.user) {
        return 'SubjectBelongsToUpdateBySubscriptionPayload';
      }
      return null;
    },
  },
});
