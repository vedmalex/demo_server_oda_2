import Subject from './Subject';
import UpdateSubjectSubscriptionPayload from './UpdateSubjectSubscriptionPayload';
import SubjectSubscription from './SubjectSubscription';
import SubjectBelongsToCreatedByArgsSubscriptionPayload from './SubjectBelongsToCreatedByArgsSubscriptionPayload';
import SubjectBelongsToCreatedBySubscriptionPayload from './SubjectBelongsToCreatedBySubscriptionPayload';
import SubjectBelongsToUpdateByArgsSubscriptionPayload from './SubjectBelongsToUpdateByArgsSubscriptionPayload';
import SubjectBelongsToUpdateBySubscriptionPayload from './SubjectBelongsToUpdateBySubscriptionPayload';
import SubjectSubscriptionPayload from './SubjectSubscriptionPayload';
import { Schema } from '../../../common';

export default new Schema({
  name: 'Subject.subscriptions',
  items: [
    Subject,
    UpdateSubjectSubscriptionPayload,
    SubjectSubscription,
    SubjectBelongsToCreatedByArgsSubscriptionPayload,
    SubjectBelongsToCreatedBySubscriptionPayload,
    SubjectBelongsToUpdateByArgsSubscriptionPayload,
    SubjectBelongsToUpdateBySubscriptionPayload,
    SubjectSubscriptionPayload,
  ],
});
