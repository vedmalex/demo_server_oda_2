import { Schema } from '../../../../common';
import deleteManyEmail from './deleteManyEmail';
import deleteManyEmailInput from './deleteManyEmailInput';
import deleteManyEmailPayload from './deleteManyEmailPayload';

export default new Schema({
  name: 'Email.mutation.deleteMany',
  items: [deleteManyEmail, deleteManyEmailInput, deleteManyEmailPayload],
});
