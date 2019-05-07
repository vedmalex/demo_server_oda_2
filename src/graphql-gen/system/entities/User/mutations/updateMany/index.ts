import { Schema } from '../../../../common';
import updateManyUser from './updateManyUser';
import updateManyUserInput from './updateManyUserInput';
import updateManyUserPayload from './updateManyUserPayload';

export default new Schema({
  name: 'User.mutation.updateMany',
  items: [updateManyUser, updateManyUserInput, updateManyUserPayload],
});
