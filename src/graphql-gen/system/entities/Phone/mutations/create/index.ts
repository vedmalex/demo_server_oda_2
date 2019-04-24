import { Schema } from '../../../../common';
import createPhone from './createPhone';
import createPhoneInput from './createPhoneInput';
import createPhonePayload from './createPhonePayload';

export default new Schema({
  name: 'Phone.mutation.create',
  items: [createPhone, createPhoneInput, createPhonePayload],
});
