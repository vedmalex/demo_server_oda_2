import { Schema } from '../../../../common';
import deletePhone from './deletePhone';
import deletePhoneInput from './deletePhoneInput';
import deletePhonePayload from './deletePhonePayload';

export default new Schema({
  name: 'Phone.mutation.delete',
  items: [deletePhone, deletePhoneInput, deletePhonePayload],
});
