import { Schema } from '../../../../common';
import createSubject from './createSubject';
import createSubjectInput from './createSubjectInput';
import createSubjectPayload from './createSubjectPayload';

export default new Schema({
  name: 'Subject.mutation.create',
  items: [createSubject, createSubjectInput, createSubjectPayload],
});
