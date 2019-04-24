import Group from './Group';
import UpdateGroupSubscriptionPayload from './UpdateGroupSubscriptionPayload';
import GroupSubscription from './GroupSubscription';
import GroupBelongsToCreatedByArgsSubscriptionPayload from './GroupBelongsToCreatedByArgsSubscriptionPayload';
import GroupBelongsToCreatedBySubscriptionPayload from './GroupBelongsToCreatedBySubscriptionPayload';
import GroupBelongsToUpdateByArgsSubscriptionPayload from './GroupBelongsToUpdateByArgsSubscriptionPayload';
import GroupBelongsToUpdateBySubscriptionPayload from './GroupBelongsToUpdateBySubscriptionPayload';
import GroupSubscriptionPayload from './GroupSubscriptionPayload';
import { Schema } from '../../../common';

export default new Schema({
  name: 'Group.subscriptions',
  items: [
    Group,
    UpdateGroupSubscriptionPayload,
    GroupSubscription,
    GroupBelongsToCreatedByArgsSubscriptionPayload,
    GroupBelongsToCreatedBySubscriptionPayload,
    GroupBelongsToUpdateByArgsSubscriptionPayload,
    GroupBelongsToUpdateBySubscriptionPayload,
    GroupSubscriptionPayload,
  ],
});
