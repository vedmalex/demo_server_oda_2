import Course from './Course';
import UpdateCourseSubscriptionPayload from './UpdateCourseSubscriptionPayload';
import CourseSubscription from './CourseSubscription';
import CourseBelongsToManySubjectsArgsSubscriptionPayload from './CourseBelongsToManySubjectsArgsSubscriptionPayload';
import CourseBelongsToManySubjectsSubscriptionPayload from './CourseBelongsToManySubjectsSubscriptionPayload';
import CourseHasManyGroupsArgsSubscriptionPayload from './CourseHasManyGroupsArgsSubscriptionPayload';
import CourseHasManyGroupsSubscriptionPayload from './CourseHasManyGroupsSubscriptionPayload';
import CourseSubscriptionPayload from './CourseSubscriptionPayload';
import { Schema } from '../../../common';

export default new Schema({
  name: 'Course.subscriptions',
  items: [
    Course,
    UpdateCourseSubscriptionPayload,
    CourseSubscription,
    CourseBelongsToManySubjectsArgsSubscriptionPayload,
    CourseBelongsToManySubjectsSubscriptionPayload,
    CourseHasManyGroupsArgsSubscriptionPayload,
    CourseHasManyGroupsSubscriptionPayload,
    CourseSubscriptionPayload,
  ],
});
