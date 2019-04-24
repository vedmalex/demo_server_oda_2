import { Schema } from '../../../../common';
import createEmail from './createEmail';
import createEmailInput from './createEmailInput';
import createEmailPayload from './createEmailPayload';

export default new Schema({
  name: 'Email.mutation.create',
  items: [createEmail, createEmailInput, createEmailPayload],
});
