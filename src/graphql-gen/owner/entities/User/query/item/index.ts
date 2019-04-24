import user from './user';
import userUniqueKeys from './userUniqueKeys';
import { Schema } from '../../../../common';

export default new Schema({
  name: 'User.queries.single',
  items: [user, userUniqueKeys],
});
