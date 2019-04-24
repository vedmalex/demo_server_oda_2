import { Schema } from '../../../../common';
import updateStudentAttendance from './updateStudentAttendance';
import updateStudentAttendanceInput from './updateStudentAttendanceInput';
import updateStudentAttendancePayload from './updateStudentAttendancePayload';

export default new Schema({
  name: 'StudentAttendance.mutation.update',
  items: [
    updateStudentAttendance,
    updateStudentAttendanceInput,
    updateStudentAttendancePayload,
  ],
});
