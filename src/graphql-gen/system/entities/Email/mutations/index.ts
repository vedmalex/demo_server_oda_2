import create from './create';
import _delete from './delete';
import update from './update';
import embedEmailInput from './embedEmailInput';

import { Schema } from '../../../common';

export default new Schema({
  name: 'Email.mutations',
  items: [create, _delete, update, embedEmailInput],
});
