import Phone from './Phone';
import UpdatePhoneSubscriptionPayload from './UpdatePhoneSubscriptionPayload';
import PhoneSubscription from './PhoneSubscription';
import PhoneBelongsToPersonArgsSubscriptionPayload from './PhoneBelongsToPersonArgsSubscriptionPayload';
import PhoneBelongsToPersonSubscriptionPayload from './PhoneBelongsToPersonSubscriptionPayload';
import PhoneSubscriptionPayload from './PhoneSubscriptionPayload';
import { Schema } from '../../../common';

export default new Schema({
  name: 'Phone.subscriptions',
  items: [
    Phone,
    UpdatePhoneSubscriptionPayload,
    PhoneSubscription,
    PhoneBelongsToPersonArgsSubscriptionPayload,
    PhoneBelongsToPersonSubscriptionPayload,
    PhoneSubscriptionPayload,
  ],
});
