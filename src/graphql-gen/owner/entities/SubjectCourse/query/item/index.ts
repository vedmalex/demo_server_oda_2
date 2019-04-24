import subjectCourse from './subjectCourse';
import subjectCourseUniqueKeys from './subjectCourseUniqueKeys';
import { Schema } from '../../../../common';

export default new Schema({
  name: 'SubjectCourse.queries.single',
  items: [subjectCourse, subjectCourseUniqueKeys],
});
