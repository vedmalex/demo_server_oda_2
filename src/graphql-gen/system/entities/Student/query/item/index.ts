import student from './student';
import studentUniqueKeys from './studentUniqueKeys';
import { Schema } from '../../../../common';

export default new Schema({
  name: 'Student.queries.single',
  items: [student, studentUniqueKeys],
});
