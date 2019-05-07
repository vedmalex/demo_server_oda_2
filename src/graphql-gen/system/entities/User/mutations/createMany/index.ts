import { Schema } from '../../../../common';
import createManyUser from './createManyUser';
import createManyUserInput from './createManyUserInput';
import createManyUserPayload from './createManyUserPayload';

export default new Schema({
  name: 'User.mutation.createMany',
  items: [createManyUser, createManyUserInput, createManyUserPayload],
});
