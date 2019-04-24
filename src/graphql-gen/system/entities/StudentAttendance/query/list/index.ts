import StudentAttendancesEdge from './StudentAttendancesEdge';
import StudentAttendancesConnection from './StudentAttendancesConnection';
import studentAttendanceItems from './studentAttendanceItems';
import studentAttendances from './studentAttendances';
import StudentAttendanceSortOrder from './StudentAttendanceSortOrder';
import StudentAttendanceComplexFilter from './StudentAttendanceComplexFilter';
import { Schema } from '../../../../common';
export default new Schema({
  name: 'StudentAttendance.queries.list',
  items: [
    StudentAttendancesEdge,
    StudentAttendancesConnection,
    studentAttendanceItems,
    studentAttendances,
    StudentAttendanceSortOrder,
    StudentAttendanceComplexFilter,
  ],
});
