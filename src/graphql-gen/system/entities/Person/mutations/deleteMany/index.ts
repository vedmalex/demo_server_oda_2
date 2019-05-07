import { Schema } from '../../../../common';
import deleteManyPerson from './deleteManyPerson';
import deleteManyPersonInput from './deleteManyPersonInput';
import deleteManyPersonPayload from './deleteManyPersonPayload';

export default new Schema({
  name: 'Person.mutation.deleteMany',
  items: [deleteManyPerson, deleteManyPersonInput, deleteManyPersonPayload],
});
