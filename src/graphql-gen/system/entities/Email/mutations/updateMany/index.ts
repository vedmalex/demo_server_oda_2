import { Schema } from '../../../../common';
import updateManyEmail from './updateManyEmail';
import updateManyEmailInput from './updateManyEmailInput';
import updateManyEmailPayload from './updateManyEmailPayload';

export default new Schema({
  name: 'Email.mutation.updateMany',
  items: [updateManyEmail, updateManyEmailInput, updateManyEmailPayload],
});
