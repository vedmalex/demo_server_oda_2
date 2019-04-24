import create from './create';
import _delete from './delete';
import update from './update';
import embedPersonInput from './embedPersonInput';

import { Schema } from '../../../common';

export default new Schema({
  name: 'Person.mutations',
  items: [create, _delete, update, embedPersonInput],
});
