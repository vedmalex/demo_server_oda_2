import { Schema } from '../../../../common';
import createManyPerson from './createManyPerson';
import createManyPersonInput from './createManyPersonInput';
import createManyPersonPayload from './createManyPersonPayload';

export default new Schema({
  name: 'Person.mutation.createMany',
  items: [createManyPerson, createManyPersonInput, createManyPersonPayload],
});
