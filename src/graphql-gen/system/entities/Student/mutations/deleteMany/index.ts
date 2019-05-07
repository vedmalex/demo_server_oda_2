import { Schema } from '../../../../common';
import deleteManyStudent from './deleteManyStudent';
import deleteManyStudentInput from './deleteManyStudentInput';
import deleteManyStudentPayload from './deleteManyStudentPayload';

export default new Schema({
  name: 'Student.mutation.deleteMany',
  items: [deleteManyStudent, deleteManyStudentInput, deleteManyStudentPayload],
});
