import { Schema } from '../../../../common';
import createManyPhone from './createManyPhone';
import createManyPhoneInput from './createManyPhoneInput';
import createManyPhonePayload from './createManyPhonePayload';

export default new Schema({
  name: 'Phone.mutation.createMany',
  items: [createManyPhone, createManyPhoneInput, createManyPhonePayload],
});
