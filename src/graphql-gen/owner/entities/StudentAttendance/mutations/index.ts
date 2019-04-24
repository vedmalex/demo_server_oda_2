import create from './create';
import _delete from './delete';
import update from './update';
import embedStudentAttendanceInput from './embedStudentAttendanceInput';

import { Schema } from '../../../common';

export default new Schema({
  name: 'StudentAttendance.mutations',
  items: [create, _delete, update, embedStudentAttendanceInput],
});
