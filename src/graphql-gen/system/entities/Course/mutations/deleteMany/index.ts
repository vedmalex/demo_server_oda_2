import { Schema } from '../../../../common';
import deleteManyCourse from './deleteManyCourse';
import deleteManyCourseInput from './deleteManyCourseInput';
import deleteManyCoursePayload from './deleteManyCoursePayload';

export default new Schema({
  name: 'Course.mutation.deleteMany',
  items: [deleteManyCourse, deleteManyCourseInput, deleteManyCoursePayload],
});
