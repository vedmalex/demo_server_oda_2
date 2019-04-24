import UsersEdge from './UsersEdge';
import UsersConnection from './UsersConnection';
import userItems from './userItems';
import users from './users';
import UserSortOrder from './UserSortOrder';
import UserComplexFilter from './UserComplexFilter';
import { Schema } from '../../../../common';
export default new Schema({
  name: 'User.queries.list',
  items: [
    UsersEdge,
    UsersConnection,
    userItems,
    users,
    UserSortOrder,
    UserComplexFilter,
  ],
});
