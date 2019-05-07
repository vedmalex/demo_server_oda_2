import { Schema } from '../../../../common';
import deleteManySubject from './deleteManySubject';
import deleteManySubjectInput from './deleteManySubjectInput';
import deleteManySubjectPayload from './deleteManySubjectPayload';

export default new Schema({
  name: 'Subject.mutation.deleteMany',
  items: [deleteManySubject, deleteManySubjectInput, deleteManySubjectPayload],
});
