import { Schema } from '../../../../common';
import createSubjectCourse from './createSubjectCourse';
import createSubjectCourseInput from './createSubjectCourseInput';
import createSubjectCoursePayload from './createSubjectCoursePayload';

export default new Schema({
  name: 'SubjectCourse.mutation.create',
  items: [
    createSubjectCourse,
    createSubjectCourseInput,
    createSubjectCoursePayload,
  ],
});
