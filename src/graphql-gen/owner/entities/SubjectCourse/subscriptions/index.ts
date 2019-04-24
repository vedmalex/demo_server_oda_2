import SubjectCourse from './SubjectCourse';
import UpdateSubjectCourseSubscriptionPayload from './UpdateSubjectCourseSubscriptionPayload';
import SubjectCourseSubscription from './SubjectCourseSubscription';
import SubjectCourseBelongsToSubjectLinkArgsSubscriptionPayload from './SubjectCourseBelongsToSubjectLinkArgsSubscriptionPayload';
import SubjectCourseBelongsToSubjectLinkSubscriptionPayload from './SubjectCourseBelongsToSubjectLinkSubscriptionPayload';
import SubjectCourseBelongsToCourseLinkArgsSubscriptionPayload from './SubjectCourseBelongsToCourseLinkArgsSubscriptionPayload';
import SubjectCourseBelongsToCourseLinkSubscriptionPayload from './SubjectCourseBelongsToCourseLinkSubscriptionPayload';
import SubjectCourseSubscriptionPayload from './SubjectCourseSubscriptionPayload';
import { Schema } from '../../../common';

export default new Schema({
  name: 'SubjectCourse.subscriptions',
  items: [
    SubjectCourse,
    UpdateSubjectCourseSubscriptionPayload,
    SubjectCourseSubscription,
    SubjectCourseBelongsToSubjectLinkArgsSubscriptionPayload,
    SubjectCourseBelongsToSubjectLinkSubscriptionPayload,
    SubjectCourseBelongsToCourseLinkArgsSubscriptionPayload,
    SubjectCourseBelongsToCourseLinkSubscriptionPayload,
    SubjectCourseSubscriptionPayload,
  ],
});
