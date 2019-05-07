import { Schema } from '../../../../common';
import updateManyStudent from './updateManyStudent';
import updateManyStudentInput from './updateManyStudentInput';
import updateManyStudentPayload from './updateManyStudentPayload';

export default new Schema({
  name: 'Student.mutation.updateMany',
  items: [updateManyStudent, updateManyStudentInput, updateManyStudentPayload],
});
