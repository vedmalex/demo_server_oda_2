import loginUser from './loginUser';

import { Schema } from '../common';

export default new Schema({
  name: 'Public.mutations',
  items: [loginUser],
});
