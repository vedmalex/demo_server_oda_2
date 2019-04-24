import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    union StudentAttendanceSubscriptionPayload =
        UpdateStudentAttendanceSubscriptionPayload
      | StudentAttendanceBelongsToCreatedBySubscriptionPayload
      | StudentAttendanceBelongsToUpdateBySubscriptionPayload
  `,
  resolver: {
    __resolveType(obj, context, info) {
      if (
        obj.id ||
        obj.createdAt ||
        obj.updatedAt ||
        obj.removed ||
        obj.owner ||
        obj.superpuper
      ) {
        return 'UpdateStudentAttendanceSubscriptionPayload';
      }
      if (obj.args && obj.args.studentAttendance && obj.args.user) {
        return 'StudentAttendanceBelongsToCreatedBySubscriptionPayload';
      }
      if (obj.args && obj.args.studentAttendance && obj.args.user) {
        return 'StudentAttendanceBelongsToUpdateBySubscriptionPayload';
      }
      return null;
    },
  },
});
