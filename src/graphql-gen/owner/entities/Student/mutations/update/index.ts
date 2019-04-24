import { Schema } from '../../../../common';
import updateStudent from './updateStudent';
import updateStudentInput from './updateStudentInput';
import updateStudentPayload from './updateStudentPayload';

export default new Schema({
  name: 'Student.mutation.update',
  items: [updateStudent, updateStudentInput, updateStudentPayload],
});
