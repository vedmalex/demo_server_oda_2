import { Schema } from '../../../../common';
import deleteStudentAttendance from './deleteStudentAttendance';
import deleteStudentAttendanceInput from './deleteStudentAttendanceInput';
import deleteStudentAttendancePayload from './deleteStudentAttendancePayload';

export default new Schema({
  name: 'StudentAttendance.mutation.delete',
  items: [
    deleteStudentAttendance,
    deleteStudentAttendanceInput,
    deleteStudentAttendancePayload,
  ],
});
