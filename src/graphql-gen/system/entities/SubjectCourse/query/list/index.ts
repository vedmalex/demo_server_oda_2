import SubjectCoursesEdge from './SubjectCoursesEdge';
import SubjectCoursesConnection from './SubjectCoursesConnection';
import subjectCourseItems from './subjectCourseItems';
import subjectCourses from './subjectCourses';
import SubjectCourseSortOrder from './SubjectCourseSortOrder';
import SubjectCourseComplexFilter from './SubjectCourseComplexFilter';
import { Schema } from '../../../../common';
export default new Schema({
  name: 'SubjectCourse.queries.list',
  items: [
    SubjectCoursesEdge,
    SubjectCoursesConnection,
    subjectCourseItems,
    subjectCourses,
    SubjectCourseSortOrder,
    SubjectCourseComplexFilter,
  ],
});
