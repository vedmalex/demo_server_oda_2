import { Schema } from '../../../../common';
import deleteEmail from './deleteEmail';
import deleteEmailInput from './deleteEmailInput';
import deleteEmailPayload from './deleteEmailPayload';

export default new Schema({
  name: 'Email.mutation.delete',
  items: [deleteEmail, deleteEmailInput, deleteEmailPayload],
});
