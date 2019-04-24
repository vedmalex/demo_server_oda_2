import Email from './Email';
import UpdateEmailSubscriptionPayload from './UpdateEmailSubscriptionPayload';
import EmailSubscription from './EmailSubscription';
import EmailBelongsToCreatedByArgsSubscriptionPayload from './EmailBelongsToCreatedByArgsSubscriptionPayload';
import EmailBelongsToCreatedBySubscriptionPayload from './EmailBelongsToCreatedBySubscriptionPayload';
import EmailBelongsToUpdateByArgsSubscriptionPayload from './EmailBelongsToUpdateByArgsSubscriptionPayload';
import EmailBelongsToUpdateBySubscriptionPayload from './EmailBelongsToUpdateBySubscriptionPayload';
import EmailSubscriptionPayload from './EmailSubscriptionPayload';
import { Schema } from '../../../common';

export default new Schema({
  name: 'Email.subscriptions',
  items: [
    Email,
    UpdateEmailSubscriptionPayload,
    EmailSubscription,
    EmailBelongsToCreatedByArgsSubscriptionPayload,
    EmailBelongsToCreatedBySubscriptionPayload,
    EmailBelongsToUpdateByArgsSubscriptionPayload,
    EmailBelongsToUpdateBySubscriptionPayload,
    EmailSubscriptionPayload,
  ],
});
