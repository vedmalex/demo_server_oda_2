import studentAttendance from './studentAttendance';
import studentAttendanceUniqueKeys from './studentAttendanceUniqueKeys';
import { Schema } from '../../../../common';

export default new Schema({
  name: 'StudentAttendance.queries.single',
  items: [studentAttendance, studentAttendanceUniqueKeys],
});
