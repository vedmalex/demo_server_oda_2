import { Schema } from '../../../../common';
import deleteCourse from './deleteCourse';
import deleteCourseInput from './deleteCourseInput';
import deleteCoursePayload from './deleteCoursePayload';

export default new Schema({
  name: 'Course.mutation.delete',
  items: [deleteCourse, deleteCourseInput, deleteCoursePayload],
});
