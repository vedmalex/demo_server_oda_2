import create from './create';
import _delete from './delete';
import update from './update';
import embedUserInput from './embedUserInput';

import { Schema } from '../../../common';

export default new Schema({
  name: 'User.mutations',
  items: [create, _delete, update, embedUserInput],
});
