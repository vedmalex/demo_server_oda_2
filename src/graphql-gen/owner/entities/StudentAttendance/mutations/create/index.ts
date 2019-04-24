import { Schema } from '../../../../common';
import createStudentAttendance from './createStudentAttendance';
import createStudentAttendanceInput from './createStudentAttendanceInput';
import createStudentAttendancePayload from './createStudentAttendancePayload';

export default new Schema({
  name: 'StudentAttendance.mutation.create',
  items: [
    createStudentAttendance,
    createStudentAttendanceInput,
    createStudentAttendancePayload,
  ],
});
