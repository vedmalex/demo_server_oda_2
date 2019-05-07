import Phone from './Phone';
import PhoneSubscriptionPayload from './PhoneSubscriptionPayload';
import PhoneSubscription from './PhoneSubscription';
import { Schema } from '../../../common';

export default new Schema({
  name: 'Phone.subscriptions',
  items: [Phone, PhoneSubscriptionPayload, PhoneSubscription],
});
