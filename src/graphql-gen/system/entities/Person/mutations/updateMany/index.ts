import { Schema } from '../../../../common';
import updateManyPerson from './updateManyPerson';
import updateManyPersonInput from './updateManyPersonInput';
import updateManyPersonPayload from './updateManyPersonPayload';

export default new Schema({
  name: 'Person.mutation.updateMany',
  items: [updateManyPerson, updateManyPersonInput, updateManyPersonPayload],
});
