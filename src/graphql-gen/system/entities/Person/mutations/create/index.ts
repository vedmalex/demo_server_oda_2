import { Schema } from '../../../../common';
import createPerson from './createPerson';
import createPersonInput from './createPersonInput';
import createPersonPayload from './createPersonPayload';

export default new Schema({
  name: 'Person.mutation.create',
  items: [createPerson, createPersonInput, createPersonPayload],
});
