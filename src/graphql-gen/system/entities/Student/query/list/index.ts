import StudentsEdge from './StudentsEdge';
import StudentsConnection from './StudentsConnection';
import StudentBelongsToManyMeetingsConnection from './StudentBelongsToManyMeetingsConnection';
import StudentBelongsToManyMeetingsEdge from './StudentBelongsToManyMeetingsEdge';
import studentItems from './studentItems';
import students from './students';
import StudentSortOrder from './StudentSortOrder';
import StudentComplexFilter from './StudentComplexFilter';
import { Schema } from '../../../../common';
export default new Schema({
  name: 'Student.queries.list',
  items: [
    StudentsEdge,
    StudentsConnection,
    StudentBelongsToManyMeetingsConnection,
    StudentBelongsToManyMeetingsEdge,
    studentItems,
    students,
    StudentSortOrder,
    StudentComplexFilter,
  ],
});
