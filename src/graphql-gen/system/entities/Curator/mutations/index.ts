import create from './create';
import _delete from './delete';
import update from './update';
import createMany from './createMany';
import createSafe from './createSafe';
import deleteMany from './deleteMany';
import deleteSafe from './deleteSafe';
import updateMany from './updateMany';
import updateSafe from './updateSafe';
import embedCuratorInput from './embedCuratorInput';

import { Schema } from '../../../common';

export default new Schema({
  name: 'Curator.mutations',
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
    embedCuratorInput,
  ],
});
