import { Schema } from '../../../../common';
import createManyStudentAttendance from './createManyStudentAttendance';
import createManyStudentAttendanceInput from './createManyStudentAttendanceInput';
import createManyStudentAttendancePayload from './createManyStudentAttendancePayload';

export default new Schema({
  name: 'StudentAttendance.mutation.createMany',
  items: [
    createManyStudentAttendance,
    createManyStudentAttendanceInput,
    createManyStudentAttendancePayload,
  ],
});
