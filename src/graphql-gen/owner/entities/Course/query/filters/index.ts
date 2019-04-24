import EmbedCourseFilter from './EmbedCourseFilter';
import EmbedCourseFilterItem from './EmbedCourseFilterItem';
import CourseFilter from './CourseFilter';
import CourseFilterItem from './CourseFilterItem';
import CourseFilterSubscriptions from './CourseFilterSubscriptions';
import CourseFilterSubscriptionsItem from './CourseFilterSubscriptionsItem';
import { Schema } from '../../../../common';

export default new Schema({
  name: 'Course.queries.filter',
  items: [
    CourseFilterItem,
    CourseFilter,
    CourseFilterSubscriptionsItem,
    CourseFilterSubscriptions,
    EmbedCourseFilter,
    EmbedCourseFilterItem,
  ],
});
