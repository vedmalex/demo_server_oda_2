import { Schema } from '../../../../common';
import updateEmail from './updateEmail';
import updateEmailInput from './updateEmailInput';
import updateEmailPayload from './updateEmailPayload';

export default new Schema({
  name: 'Email.mutation.update',
  items: [updateEmail, updateEmailInput, updateEmailPayload],
});
