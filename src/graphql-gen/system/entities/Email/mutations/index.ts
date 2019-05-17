import create from './create';
import _delete from './delete';
import update from './update';
import createMany from './createMany';
import createSafe from './createSafe';
import deleteMany from './deleteMany';
import deleteSafe from './deleteSafe';
import updateMany from './updateMany';
import updateSafe from './updateSafe';
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
    createSafe,
    updateSafe,
    deleteSafe,
    embedEmailInput,
  ],
});
