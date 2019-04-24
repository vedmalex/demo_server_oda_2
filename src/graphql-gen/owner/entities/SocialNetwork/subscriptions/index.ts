import SocialNetwork from './SocialNetwork';
import UpdateSocialNetworkSubscriptionPayload from './UpdateSocialNetworkSubscriptionPayload';
import SocialNetworkSubscription from './SocialNetworkSubscription';
import SocialNetworkBelongsToPersonArgsSubscriptionPayload from './SocialNetworkBelongsToPersonArgsSubscriptionPayload';
import SocialNetworkBelongsToPersonSubscriptionPayload from './SocialNetworkBelongsToPersonSubscriptionPayload';
import SocialNetworkSubscriptionPayload from './SocialNetworkSubscriptionPayload';
import { Schema } from '../../../common';

export default new Schema({
  name: 'SocialNetwork.subscriptions',
  items: [
    SocialNetwork,
    UpdateSocialNetworkSubscriptionPayload,
    SocialNetworkSubscription,
    SocialNetworkBelongsToPersonArgsSubscriptionPayload,
    SocialNetworkBelongsToPersonSubscriptionPayload,
    SocialNetworkSubscriptionPayload,
  ],
});
