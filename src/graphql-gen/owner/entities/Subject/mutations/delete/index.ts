import { Schema } from '../../../../common';
import deleteSubject from './deleteSubject';
import deleteSubjectInput from './deleteSubjectInput';
import deleteSubjectPayload from './deleteSubjectPayload';

export default new Schema({
  name: 'Subject.mutation.delete',
  items: [deleteSubject, deleteSubjectInput, deleteSubjectPayload],
});
