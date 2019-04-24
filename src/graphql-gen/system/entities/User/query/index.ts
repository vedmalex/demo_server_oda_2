import list from './list';
import item from './item';
import filters from './filters';

import { Schema } from '../../../common';

export default new Schema({
  name: 'User.query',
  items: [list, item, filters],
});
