import create from './create';
import _delete from './delete';
import update from './update';
import embedCourseInput from './embedCourseInput';

import { Schema } from '../../../common';

export default new Schema({
  name: 'Course.mutations',
  items: [create, _delete, update, embedCourseInput],
});
