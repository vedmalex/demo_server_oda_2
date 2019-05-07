import { Schema } from '../../../../common';
import createManyCourse from './createManyCourse';
import createManyCourseInput from './createManyCourseInput';
import createManyCoursePayload from './createManyCoursePayload';

export default new Schema({
  name: 'Course.mutation.createMany',
  items: [createManyCourse, createManyCourseInput, createManyCoursePayload],
});
