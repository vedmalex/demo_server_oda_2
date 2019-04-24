import { Schema } from '../../../../common';
import createStudent from './createStudent';
import createStudentInput from './createStudentInput';
import createStudentPayload from './createStudentPayload';

export default new Schema({
  name: 'Student.mutation.create',
  items: [createStudent, createStudentInput, createStudentPayload],
});
