import create from './create';
import _delete from './delete';
import update from './update';
import embedStudentInput from './embedStudentInput';

import { Schema } from '../../../common';

export default new Schema({
  name: 'Student.mutations',
  items: [create, _delete, update, embedStudentInput],
});
