import Curator from './Curator';
import UpdateCuratorSubscriptionPayload from './UpdateCuratorSubscriptionPayload';
import CuratorSubscription from './CuratorSubscription';
import CuratorBelongsToPersonArgsSubscriptionPayload from './CuratorBelongsToPersonArgsSubscriptionPayload';
import CuratorBelongsToPersonSubscriptionPayload from './CuratorBelongsToPersonSubscriptionPayload';
import CuratorHasManyGroupsArgsSubscriptionPayload from './CuratorHasManyGroupsArgsSubscriptionPayload';
import CuratorHasManyGroupsSubscriptionPayload from './CuratorHasManyGroupsSubscriptionPayload';
import CuratorSubscriptionPayload from './CuratorSubscriptionPayload';
import { Schema } from '../../../common';

export default new Schema({
  name: 'Curator.subscriptions',
  items: [
    Curator,
    UpdateCuratorSubscriptionPayload,
    CuratorSubscription,
    CuratorBelongsToPersonArgsSubscriptionPayload,
    CuratorBelongsToPersonSubscriptionPayload,
    CuratorHasManyGroupsArgsSubscriptionPayload,
    CuratorHasManyGroupsSubscriptionPayload,
    CuratorSubscriptionPayload,
  ],
});
