import CoursesEdge from './CoursesEdge';
import CoursesConnection from './CoursesConnection';
import CourseBelongsToManySubjectsConnection from './CourseBelongsToManySubjectsConnection';
import CourseBelongsToManySubjectsEdge from './CourseBelongsToManySubjectsEdge';
import CourseHasManyGroupsConnection from './CourseHasManyGroupsConnection';
import CourseHasManyGroupsEdge from './CourseHasManyGroupsEdge';
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
    CourseBelongsToManySubjectsConnection,
    CourseBelongsToManySubjectsEdge,
    CourseHasManyGroupsConnection,
    CourseHasManyGroupsEdge,
    courseItems,
    courses,
    CourseSortOrder,
    CourseComplexFilter,
  ],
});
