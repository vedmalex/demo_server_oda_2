import Subject from './Subject';
import UpdateSubjectSubscriptionPayload from './UpdateSubjectSubscriptionPayload';
import SubjectSubscription from './SubjectSubscription';
import SubjectBelongsToManyCoursesArgsSubscriptionPayload from './SubjectBelongsToManyCoursesArgsSubscriptionPayload';
import SubjectBelongsToManyCoursesSubscriptionPayload from './SubjectBelongsToManyCoursesSubscriptionPayload';
import SubjectSubscriptionPayload from './SubjectSubscriptionPayload';
import { Schema } from '../../../common';

export default new Schema({
  name: 'Subject.subscriptions',
  items: [
    Subject,
    UpdateSubjectSubscriptionPayload,
    SubjectSubscription,
    SubjectBelongsToManyCoursesArgsSubscriptionPayload,
    SubjectBelongsToManyCoursesSubscriptionPayload,
    SubjectSubscriptionPayload,
  ],
});
