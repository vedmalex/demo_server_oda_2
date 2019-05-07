import { Schema } from '../../../../common';
import createManyEmail from './createManyEmail';
import createManyEmailInput from './createManyEmailInput';
import createManyEmailPayload from './createManyEmailPayload';

export default new Schema({
  name: 'Email.mutation.createMany',
  items: [createManyEmail, createManyEmailInput, createManyEmailPayload],
});
