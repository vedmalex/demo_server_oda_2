import SocialNetwork from './SocialNetwork';
import UpdateSocialNetworkSubscriptionPayload from './UpdateSocialNetworkSubscriptionPayload';
import SocialNetworkSubscription from './SocialNetworkSubscription';
import SocialNetworkBelongsToCreatedByArgsSubscriptionPayload from './SocialNetworkBelongsToCreatedByArgsSubscriptionPayload';
import SocialNetworkBelongsToCreatedBySubscriptionPayload from './SocialNetworkBelongsToCreatedBySubscriptionPayload';
import SocialNetworkBelongsToUpdateByArgsSubscriptionPayload from './SocialNetworkBelongsToUpdateByArgsSubscriptionPayload';
import SocialNetworkBelongsToUpdateBySubscriptionPayload from './SocialNetworkBelongsToUpdateBySubscriptionPayload';
import SocialNetworkSubscriptionPayload from './SocialNetworkSubscriptionPayload';
import { Schema } from '../../../common';

export default new Schema({
  name: 'SocialNetwork.subscriptions',
  items: [
    SocialNetwork,
    UpdateSocialNetworkSubscriptionPayload,
    SocialNetworkSubscription,
    SocialNetworkBelongsToCreatedByArgsSubscriptionPayload,
    SocialNetworkBelongsToCreatedBySubscriptionPayload,
    SocialNetworkBelongsToUpdateByArgsSubscriptionPayload,
    SocialNetworkBelongsToUpdateBySubscriptionPayload,
    SocialNetworkSubscriptionPayload,
  ],
});
