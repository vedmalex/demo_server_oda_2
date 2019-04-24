import User from './User';
import UserSubscriptionPayload from './UserSubscriptionPayload';
import UserSubscription from './UserSubscription';
import { Schema } from '../../../common';

export default new Schema({
  name: 'User.subscriptions',
  items: [User, UserSubscriptionPayload, UserSubscription],
});
