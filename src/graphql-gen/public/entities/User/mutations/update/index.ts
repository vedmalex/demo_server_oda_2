import { Schema } from '../../../../common';
import updateUser from './updateUser';
import updateUserInput from './updateUserInput';
import updateUserPayload from './updateUserPayload';

export default new Schema({
  name: 'User.mutation.update',
  items: [updateUser, updateUserInput, updateUserPayload],
});
