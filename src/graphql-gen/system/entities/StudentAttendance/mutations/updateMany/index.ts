import { Schema } from '../../../../common';
import updateManyStudentAttendance from './updateManyStudentAttendance';
import updateManyStudentAttendanceInput from './updateManyStudentAttendanceInput';
import updateManyStudentAttendancePayload from './updateManyStudentAttendancePayload';

export default new Schema({
  name: 'StudentAttendance.mutation.updateMany',
  items: [
    updateManyStudentAttendance,
    updateManyStudentAttendanceInput,
    updateManyStudentAttendancePayload,
  ],
});
