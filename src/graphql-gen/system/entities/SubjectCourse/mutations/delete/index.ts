import { Schema } from '../../../../common';
import deleteSubjectCourse from './deleteSubjectCourse';
import deleteSubjectCourseInput from './deleteSubjectCourseInput';
import deleteSubjectCoursePayload from './deleteSubjectCoursePayload';

export default new Schema({
  name: 'SubjectCourse.mutation.delete',
  items: [
    deleteSubjectCourse,
    deleteSubjectCourseInput,
    deleteSubjectCoursePayload,
  ],
});
