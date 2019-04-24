import Email from './Email';
import UpdateEmailSubscriptionPayload from './UpdateEmailSubscriptionPayload';
import EmailSubscription from './EmailSubscription';
import EmailBelongsToPersonArgsSubscriptionPayload from './EmailBelongsToPersonArgsSubscriptionPayload';
import EmailBelongsToPersonSubscriptionPayload from './EmailBelongsToPersonSubscriptionPayload';
import EmailSubscriptionPayload from './EmailSubscriptionPayload';
import { Schema } from '../../../common';

export default new Schema({
  name: 'Email.subscriptions',
  items: [
    Email,
    UpdateEmailSubscriptionPayload,
    EmailSubscription,
    EmailBelongsToPersonArgsSubscriptionPayload,
    EmailBelongsToPersonSubscriptionPayload,
    EmailSubscriptionPayload,
  ],
});
