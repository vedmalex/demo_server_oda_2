import { Schema } from '../../../../common';
import updateSubjectCourse from './updateSubjectCourse';
import updateSubjectCourseInput from './updateSubjectCourseInput';
import updateSubjectCoursePayload from './updateSubjectCoursePayload';

export default new Schema({
  name: 'SubjectCourse.mutation.update',
  items: [
    updateSubjectCourse,
    updateSubjectCourseInput,
    updateSubjectCoursePayload,
  ],
});
