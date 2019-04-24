import { Schema } from '../../../../common';
import deleteUser from './deleteUser';
import deleteUserInput from './deleteUserInput';
import deleteUserPayload from './deleteUserPayload';

export default new Schema({
  name: 'User.mutation.delete',
  items: [deleteUser, deleteUserInput, deleteUserPayload],
});
