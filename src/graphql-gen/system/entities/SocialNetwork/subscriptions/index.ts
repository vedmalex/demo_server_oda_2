import SocialNetwork from './SocialNetwork';
import SocialNetworkSubscriptionPayload from './SocialNetworkSubscriptionPayload';
import SocialNetworkSubscription from './SocialNetworkSubscription';
import { Schema } from '../../../common';

export default new Schema({
  name: 'SocialNetwork.subscriptions',
  items: [
    SocialNetwork,
    SocialNetworkSubscriptionPayload,
    SocialNetworkSubscription,
  ],
});
