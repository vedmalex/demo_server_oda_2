import CoursesEdge from './CoursesEdge';
import CoursesConnection from './CoursesConnection';
import courseItems from './courseItems';
import courses from './courses';
import CourseSortOrder from './CourseSortOrder';
import CourseComplexFilter from './CourseComplexFilter';
import { Schema } from '../../../../common';
export default new Schema({
  name: 'Course.queries.list',
  items: [
    CoursesEdge,
    CoursesConnection,
    courseItems,
    courses,
    CourseSortOrder,
    CourseComplexFilter,
  ],
});
