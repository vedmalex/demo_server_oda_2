import create from './create';
import _delete from './delete';
import update from './update';
import embedPhoneInput from './embedPhoneInput';

import { Schema } from '../../../common';

export default new Schema({
  name: 'Phone.mutations',
  items: [create, _delete, update, embedPhoneInput],
});
