import { Schema } from '../../../../common';
import deletePerson from './deletePerson';
import deletePersonInput from './deletePersonInput';
import deletePersonPayload from './deletePersonPayload';

export default new Schema({
  name: 'Person.mutation.delete',
  items: [deletePerson, deletePersonInput, deletePersonPayload],
});
