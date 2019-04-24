import { ModelType, Type } from '../../../common';
import gql from 'graphql-tag';

export default new Type({
  type: ModelType.type,
  schema: gql`
    union StudentAttendanceSubscriptionPayload =
        UpdateStudentAttendanceSubscriptionPayload
      | StudentAttendanceBelongsToMeetingLinkSubscriptionPayload
      | StudentAttendanceBelongsToStudentLinkSubscriptionPayload
  `,
  resolver: {
    __resolveType(obj, context, info) {
      if (
        obj.id ||
        obj.meeting ||
        obj.student ||
        obj.present ||
        obj.specialNotes ||
        obj.superpuper
      ) {
        return 'UpdateStudentAttendanceSubscriptionPayload';
      }
      if (obj.args && obj.args.studentAttendance && obj.args.meeting) {
        return 'StudentAttendanceBelongsToMeetingLinkSubscriptionPayload';
      }
      if (obj.args && obj.args.studentAttendance && obj.args.student) {
        return 'StudentAttendanceBelongsToStudentLinkSubscriptionPayload';
      }
      return null;
    },
  },
});
