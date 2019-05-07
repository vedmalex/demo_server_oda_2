import { Schema } from '../../../../common';
import deleteManyUser from './deleteManyUser';
import deleteManyUserInput from './deleteManyUserInput';
import deleteManyUserPayload from './deleteManyUserPayload';

export default new Schema({
  name: 'User.mutation.deleteMany',
  items: [deleteManyUser, deleteManyUserInput, deleteManyUserPayload],
});
