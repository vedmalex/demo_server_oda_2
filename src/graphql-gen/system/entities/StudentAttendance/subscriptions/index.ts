import StudentAttendance from './StudentAttendance';
import UpdateStudentAttendanceSubscriptionPayload from './UpdateStudentAttendanceSubscriptionPayload';
import StudentAttendanceSubscription from './StudentAttendanceSubscription';
import StudentAttendanceBelongsToCreatedByArgsSubscriptionPayload from './StudentAttendanceBelongsToCreatedByArgsSubscriptionPayload';
import StudentAttendanceBelongsToCreatedBySubscriptionPayload from './StudentAttendanceBelongsToCreatedBySubscriptionPayload';
import StudentAttendanceBelongsToUpdateByArgsSubscriptionPayload from './StudentAttendanceBelongsToUpdateByArgsSubscriptionPayload';
import StudentAttendanceBelongsToUpdateBySubscriptionPayload from './StudentAttendanceBelongsToUpdateBySubscriptionPayload';
import StudentAttendanceSubscriptionPayload from './StudentAttendanceSubscriptionPayload';
import { Schema } from '../../../common';

export default new Schema({
  name: 'StudentAttendance.subscriptions',
  items: [
    StudentAttendance,
    UpdateStudentAttendanceSubscriptionPayload,
    StudentAttendanceSubscription,
    StudentAttendanceBelongsToCreatedByArgsSubscriptionPayload,
    StudentAttendanceBelongsToCreatedBySubscriptionPayload,
    StudentAttendanceBelongsToUpdateByArgsSubscriptionPayload,
    StudentAttendanceBelongsToUpdateBySubscriptionPayload,
    StudentAttendanceSubscriptionPayload,
  ],
});
