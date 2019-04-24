import create from './create';
import _delete from './delete';
import update from './update';
import embedCuratorInput from './embedCuratorInput';

import { Schema } from '../../../common';

export default new Schema({
  name: 'Curator.mutations',
  items: [create, _delete, update, embedCuratorInput],
});
