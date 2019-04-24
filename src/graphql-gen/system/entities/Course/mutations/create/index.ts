import { Schema } from '../../../../common';
import createCourse from './createCourse';
import createCourseInput from './createCourseInput';
import createCoursePayload from './createCoursePayload';

export default new Schema({
  name: 'Course.mutation.create',
  items: [createCourse, createCourseInput, createCoursePayload],
});
