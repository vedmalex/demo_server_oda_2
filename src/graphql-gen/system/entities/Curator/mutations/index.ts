import create from './create';
import _delete from './delete';
import update from './update';
import createMany from './createMany';
import deleteMany from './deleteMany';
import updateMany from './updateMany';
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
    embedCuratorInput,
  ],
});
