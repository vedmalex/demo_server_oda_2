import Email from './Email';
import EmailSubscriptionPayload from './EmailSubscriptionPayload';
import EmailSubscription from './EmailSubscription';
import { Schema } from '../../../common';

export default new Schema({
  name: 'Email.subscriptions',
  items: [Email, EmailSubscriptionPayload, EmailSubscription],
});
