import { Schema } from '../../../../common';
import updateManyPhone from './updateManyPhone';
import updateManyPhoneInput from './updateManyPhoneInput';
import updateManyPhonePayload from './updateManyPhonePayload';

export default new Schema({
  name: 'Phone.mutation.updateMany',
  items: [updateManyPhone, updateManyPhoneInput, updateManyPhonePayload],
});
