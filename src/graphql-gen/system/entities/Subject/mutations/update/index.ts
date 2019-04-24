import { Schema } from '../../../../common';
import updateSubject from './updateSubject';
import updateSubjectInput from './updateSubjectInput';
import updateSubjectPayload from './updateSubjectPayload';

export default new Schema({
  name: 'Subject.mutation.update',
  items: [updateSubject, updateSubjectInput, updateSubjectPayload],
});
