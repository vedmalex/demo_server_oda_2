import { Schema } from '../../../../common';
import createUser from './createUser';
import createUserInput from './createUserInput';
import createUserPayload from './createUserPayload';

export default new Schema({
  name: 'User.mutation.create',
  items: [createUser, createUserInput, createUserPayload],
});
