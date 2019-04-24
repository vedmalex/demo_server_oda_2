import { Schema } from '../../../../common';
import updatePerson from './updatePerson';
import updatePersonInput from './updatePersonInput';
import updatePersonPayload from './updatePersonPayload';

export default new Schema({
  name: 'Person.mutation.update',
  items: [updatePerson, updatePersonInput, updatePersonPayload],
});
