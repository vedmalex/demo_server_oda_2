import EmbedStudentAttendanceFilter from './EmbedStudentAttendanceFilter';
import EmbedStudentAttendanceFilterItem from './EmbedStudentAttendanceFilterItem';
import StudentAttendanceFilter from './StudentAttendanceFilter';
import StudentAttendanceFilterItem from './StudentAttendanceFilterItem';
import StudentAttendanceFilterSubscriptions from './StudentAttendanceFilterSubscriptions';
import StudentAttendanceFilterSubscriptionsItem from './StudentAttendanceFilterSubscriptionsItem';
import { Schema } from '../../../../common';

export default new Schema({
  name: 'StudentAttendance.queries.filter',
  items: [
    StudentAttendanceFilterItem,
    StudentAttendanceFilter,
    StudentAttendanceFilterSubscriptionsItem,
    StudentAttendanceFilterSubscriptions,
    EmbedStudentAttendanceFilter,
    EmbedStudentAttendanceFilterItem,
  ],
});
