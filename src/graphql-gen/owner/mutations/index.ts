import loginUser from './loginUser';

import { Schema } from '../common';

export default new Schema({
  name: 'Owner.mutations',
  items: [loginUser],
});
