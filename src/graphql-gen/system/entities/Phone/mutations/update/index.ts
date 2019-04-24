import { Schema } from '../../../../common';
import updatePhone from './updatePhone';
import updatePhoneInput from './updatePhoneInput';
import updatePhonePayload from './updatePhonePayload';

export default new Schema({
  name: 'Phone.mutation.update',
  items: [updatePhone, updatePhoneInput, updatePhonePayload],
});
