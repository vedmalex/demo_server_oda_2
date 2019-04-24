import Curator from './Curator';
import UpdateCuratorSubscriptionPayload from './UpdateCuratorSubscriptionPayload';
import CuratorSubscription from './CuratorSubscription';
import CuratorBelongsToCreatedByArgsSubscriptionPayload from './CuratorBelongsToCreatedByArgsSubscriptionPayload';
import CuratorBelongsToCreatedBySubscriptionPayload from './CuratorBelongsToCreatedBySubscriptionPayload';
import CuratorBelongsToUpdateByArgsSubscriptionPayload from './CuratorBelongsToUpdateByArgsSubscriptionPayload';
import CuratorBelongsToUpdateBySubscriptionPayload from './CuratorBelongsToUpdateBySubscriptionPayload';
import CuratorSubscriptionPayload from './CuratorSubscriptionPayload';
import { Schema } from '../../../common';

export default new Schema({
  name: 'Curator.subscriptions',
  items: [
    Curator,
    UpdateCuratorSubscriptionPayload,
    CuratorSubscription,
    CuratorBelongsToCreatedByArgsSubscriptionPayload,
    CuratorBelongsToCreatedBySubscriptionPayload,
    CuratorBelongsToUpdateByArgsSubscriptionPayload,
    CuratorBelongsToUpdateBySubscriptionPayload,
    CuratorSubscriptionPayload,
  ],
});
