import { Schema } from '../../../../common';
import deleteManyStudentAttendance from './deleteManyStudentAttendance';
import deleteManyStudentAttendanceInput from './deleteManyStudentAttendanceInput';
import deleteManyStudentAttendancePayload from './deleteManyStudentAttendancePayload';

export default new Schema({
  name: 'StudentAttendance.mutation.deleteMany',
  items: [
    deleteManyStudentAttendance,
    deleteManyStudentAttendanceInput,
    deleteManyStudentAttendancePayload,
  ],
});
