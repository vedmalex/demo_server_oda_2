import SubjectCourse from './SubjectCourse';
import UpdateSubjectCourseSubscriptionPayload from './UpdateSubjectCourseSubscriptionPayload';
import SubjectCourseSubscription from './SubjectCourseSubscription';
import SubjectCourseBelongsToCreatedByArgsSubscriptionPayload from './SubjectCourseBelongsToCreatedByArgsSubscriptionPayload';
import SubjectCourseBelongsToCreatedBySubscriptionPayload from './SubjectCourseBelongsToCreatedBySubscriptionPayload';
import SubjectCourseBelongsToUpdateByArgsSubscriptionPayload from './SubjectCourseBelongsToUpdateByArgsSubscriptionPayload';
import SubjectCourseBelongsToUpdateBySubscriptionPayload from './SubjectCourseBelongsToUpdateBySubscriptionPayload';
import SubjectCourseSubscriptionPayload from './SubjectCourseSubscriptionPayload';
import { Schema } from '../../../common';

export default new Schema({
  name: 'SubjectCourse.subscriptions',
  items: [
    SubjectCourse,
    UpdateSubjectCourseSubscriptionPayload,
    SubjectCourseSubscription,
    SubjectCourseBelongsToCreatedByArgsSubscriptionPayload,
    SubjectCourseBelongsToCreatedBySubscriptionPayload,
    SubjectCourseBelongsToUpdateByArgsSubscriptionPayload,
    SubjectCourseBelongsToUpdateBySubscriptionPayload,
    SubjectCourseSubscriptionPayload,
  ],
});
