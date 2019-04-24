import { Schema } from '../../../../common';
import deleteStudent from './deleteStudent';
import deleteStudentInput from './deleteStudentInput';
import deleteStudentPayload from './deleteStudentPayload';

export default new Schema({
  name: 'Student.mutation.delete',
  items: [deleteStudent, deleteStudentInput, deleteStudentPayload],
});
