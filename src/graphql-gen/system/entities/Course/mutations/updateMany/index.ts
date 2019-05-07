import { Schema } from '../../../../common';
import updateManyCourse from './updateManyCourse';
import updateManyCourseInput from './updateManyCourseInput';
import updateManyCoursePayload from './updateManyCoursePayload';

export default new Schema({
  name: 'Course.mutation.updateMany',
  items: [updateManyCourse, updateManyCourseInput, updateManyCoursePayload],
});
