import create from './create';
import _delete from './delete';
import update from './update';
import createMany from './createMany';
import deleteMany from './deleteMany';
import updateMany from './updateMany';
import embedEmailInput from './embedEmailInput';

import { Schema } from '../../../common';

export default new Schema({
  name: 'Email.mutations',
  items: [
    create,
    _delete,
    update,
    createMany,
    deleteMany,
    updateMany,
    embedEmailInput,
  ],
});
