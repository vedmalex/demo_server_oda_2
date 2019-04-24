import Phone from './Phone';
import UpdatePhoneSubscriptionPayload from './UpdatePhoneSubscriptionPayload';
import PhoneSubscription from './PhoneSubscription';
import PhoneBelongsToCreatedByArgsSubscriptionPayload from './PhoneBelongsToCreatedByArgsSubscriptionPayload';
import PhoneBelongsToCreatedBySubscriptionPayload from './PhoneBelongsToCreatedBySubscriptionPayload';
import PhoneBelongsToUpdateByArgsSubscriptionPayload from './PhoneBelongsToUpdateByArgsSubscriptionPayload';
import PhoneBelongsToUpdateBySubscriptionPayload from './PhoneBelongsToUpdateBySubscriptionPayload';
import PhoneSubscriptionPayload from './PhoneSubscriptionPayload';
import { Schema } from '../../../common';

export default new Schema({
  name: 'Phone.subscriptions',
  items: [
    Phone,
    UpdatePhoneSubscriptionPayload,
    PhoneSubscription,
    PhoneBelongsToCreatedByArgsSubscriptionPayload,
    PhoneBelongsToCreatedBySubscriptionPayload,
    PhoneBelongsToUpdateByArgsSubscriptionPayload,
    PhoneBelongsToUpdateBySubscriptionPayload,
    PhoneSubscriptionPayload,
  ],
});
