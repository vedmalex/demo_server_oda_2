import { Schema } from '../../../../common';
import createManyStudent from './createManyStudent';
import createManyStudentInput from './createManyStudentInput';
import createManyStudentPayload from './createManyStudentPayload';

export default new Schema({
  name: 'Student.mutation.createMany',
  items: [createManyStudent, createManyStudentInput, createManyStudentPayload],
});
