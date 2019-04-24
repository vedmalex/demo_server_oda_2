import Student from './Student';
import UpdateStudentSubscriptionPayload from './UpdateStudentSubscriptionPayload';
import StudentSubscription from './StudentSubscription';
import StudentBelongsToPersonArgsSubscriptionPayload from './StudentBelongsToPersonArgsSubscriptionPayload';
import StudentBelongsToPersonSubscriptionPayload from './StudentBelongsToPersonSubscriptionPayload';
import StudentBelongsToGroupArgsSubscriptionPayload from './StudentBelongsToGroupArgsSubscriptionPayload';
import StudentBelongsToGroupSubscriptionPayload from './StudentBelongsToGroupSubscriptionPayload';
import StudentBelongsToManyMeetingsArgsSubscriptionPayload from './StudentBelongsToManyMeetingsArgsSubscriptionPayload';
import StudentBelongsToManyMeetingsSubscriptionPayload from './StudentBelongsToManyMeetingsSubscriptionPayload';
import StudentSubscriptionPayload from './StudentSubscriptionPayload';
import { Schema } from '../../../common';

export default new Schema({
  name: 'Student.subscriptions',
  items: [
    Student,
    UpdateStudentSubscriptionPayload,
    StudentSubscription,
    StudentBelongsToPersonArgsSubscriptionPayload,
    StudentBelongsToPersonSubscriptionPayload,
    StudentBelongsToGroupArgsSubscriptionPayload,
    StudentBelongsToGroupSubscriptionPayload,
    StudentBelongsToManyMeetingsArgsSubscriptionPayload,
    StudentBelongsToManyMeetingsSubscriptionPayload,
    StudentSubscriptionPayload,
  ],
});
