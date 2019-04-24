import Student from './Student';
import UpdateStudentSubscriptionPayload from './UpdateStudentSubscriptionPayload';
import StudentSubscription from './StudentSubscription';
import StudentBelongsToCreatedByArgsSubscriptionPayload from './StudentBelongsToCreatedByArgsSubscriptionPayload';
import StudentBelongsToCreatedBySubscriptionPayload from './StudentBelongsToCreatedBySubscriptionPayload';
import StudentBelongsToUpdateByArgsSubscriptionPayload from './StudentBelongsToUpdateByArgsSubscriptionPayload';
import StudentBelongsToUpdateBySubscriptionPayload from './StudentBelongsToUpdateBySubscriptionPayload';
import StudentSubscriptionPayload from './StudentSubscriptionPayload';
import { Schema } from '../../../common';

export default new Schema({
  name: 'Student.subscriptions',
  items: [
    Student,
    UpdateStudentSubscriptionPayload,
    StudentSubscription,
    StudentBelongsToCreatedByArgsSubscriptionPayload,
    StudentBelongsToCreatedBySubscriptionPayload,
    StudentBelongsToUpdateByArgsSubscriptionPayload,
    StudentBelongsToUpdateBySubscriptionPayload,
    StudentSubscriptionPayload,
  ],
});
