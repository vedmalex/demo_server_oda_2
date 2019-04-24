import create from './create';
import _delete from './delete';
import update from './update';
import embedGroupInput from './embedGroupInput';

import { Schema } from '../../../common';

export default new Schema({
  name: 'Group.mutations',
  items: [create, _delete, update, embedGroupInput],
});
