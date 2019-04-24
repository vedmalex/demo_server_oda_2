import create from './create';
import _delete from './delete';
import update from './update';
import embedSubjectCourseInput from './embedSubjectCourseInput';

import { Schema } from '../../../common';

export default new Schema({
  name: 'SubjectCourse.mutations',
  items: [create, _delete, update, embedSubjectCourseInput],
});
