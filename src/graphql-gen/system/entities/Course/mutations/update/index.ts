import { Schema } from '../../../../common';
import updateCourse from './updateCourse';
import updateCourseInput from './updateCourseInput';
import updateCoursePayload from './updateCoursePayload';

export default new Schema({
  name: 'Course.mutation.update',
  items: [updateCourse, updateCourseInput, updateCoursePayload],
});
