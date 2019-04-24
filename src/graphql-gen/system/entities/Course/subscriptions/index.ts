import Course from './Course';
import UpdateCourseSubscriptionPayload from './UpdateCourseSubscriptionPayload';
import CourseSubscription from './CourseSubscription';
import CourseBelongsToCreatedByArgsSubscriptionPayload from './CourseBelongsToCreatedByArgsSubscriptionPayload';
import CourseBelongsToCreatedBySubscriptionPayload from './CourseBelongsToCreatedBySubscriptionPayload';
import CourseBelongsToUpdateByArgsSubscriptionPayload from './CourseBelongsToUpdateByArgsSubscriptionPayload';
import CourseBelongsToUpdateBySubscriptionPayload from './CourseBelongsToUpdateBySubscriptionPayload';
import CourseSubscriptionPayload from './CourseSubscriptionPayload';
import { Schema } from '../../../common';

export default new Schema({
  name: 'Course.subscriptions',
  items: [
    Course,
    UpdateCourseSubscriptionPayload,
    CourseSubscription,
    CourseBelongsToCreatedByArgsSubscriptionPayload,
    CourseBelongsToCreatedBySubscriptionPayload,
    CourseBelongsToUpdateByArgsSubscriptionPayload,
    CourseBelongsToUpdateBySubscriptionPayload,
    CourseSubscriptionPayload,
  ],
});
