import StudentAttendance from './StudentAttendance';
import UpdateStudentAttendanceSubscriptionPayload from './UpdateStudentAttendanceSubscriptionPayload';
import StudentAttendanceSubscription from './StudentAttendanceSubscription';
import StudentAttendanceBelongsToMeetingLinkArgsSubscriptionPayload from './StudentAttendanceBelongsToMeetingLinkArgsSubscriptionPayload';
import StudentAttendanceBelongsToMeetingLinkSubscriptionPayload from './StudentAttendanceBelongsToMeetingLinkSubscriptionPayload';
import StudentAttendanceBelongsToStudentLinkArgsSubscriptionPayload from './StudentAttendanceBelongsToStudentLinkArgsSubscriptionPayload';
import StudentAttendanceBelongsToStudentLinkSubscriptionPayload from './StudentAttendanceBelongsToStudentLinkSubscriptionPayload';
import StudentAttendanceSubscriptionPayload from './StudentAttendanceSubscriptionPayload';
import { Schema } from '../../../common';

export default new Schema({
  name: 'StudentAttendance.subscriptions',
  items: [
    StudentAttendance,
    UpdateStudentAttendanceSubscriptionPayload,
    StudentAttendanceSubscription,
    StudentAttendanceBelongsToMeetingLinkArgsSubscriptionPayload,
    StudentAttendanceBelongsToMeetingLinkSubscriptionPayload,
    StudentAttendanceBelongsToStudentLinkArgsSubscriptionPayload,
    StudentAttendanceBelongsToStudentLinkSubscriptionPayload,
    StudentAttendanceSubscriptionPayload,
  ],
});
