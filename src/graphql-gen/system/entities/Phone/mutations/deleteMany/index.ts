import { Schema } from '../../../../common';
import deleteManyPhone from './deleteManyPhone';
import deleteManyPhoneInput from './deleteManyPhoneInput';
import deleteManyPhonePayload from './deleteManyPhonePayload';

export default new Schema({
  name: 'Phone.mutation.deleteMany',
  items: [deleteManyPhone, deleteManyPhoneInput, deleteManyPhonePayload],
});
