import Group from './Group';
import UpdateGroupSubscriptionPayload from './UpdateGroupSubscriptionPayload';
import GroupSubscription from './GroupSubscription';
import GroupBelongsToCourseArgsSubscriptionPayload from './GroupBelongsToCourseArgsSubscriptionPayload';
import GroupBelongsToCourseSubscriptionPayload from './GroupBelongsToCourseSubscriptionPayload';
import GroupHasManyStudentsArgsSubscriptionPayload from './GroupHasManyStudentsArgsSubscriptionPayload';
import GroupHasManyStudentsSubscriptionPayload from './GroupHasManyStudentsSubscriptionPayload';
import GroupBelongsToCuratorArgsSubscriptionPayload from './GroupBelongsToCuratorArgsSubscriptionPayload';
import GroupBelongsToCuratorSubscriptionPayload from './GroupBelongsToCuratorSubscriptionPayload';
import GroupSubscriptionPayload from './GroupSubscriptionPayload';
import { Schema } from '../../../common';

export default new Schema({
  name: 'Group.subscriptions',
  items: [
    Group,
    UpdateGroupSubscriptionPayload,
    GroupSubscription,
    GroupBelongsToCourseArgsSubscriptionPayload,
    GroupBelongsToCourseSubscriptionPayload,
    GroupHasManyStudentsArgsSubscriptionPayload,
    GroupHasManyStudentsSubscriptionPayload,
    GroupBelongsToCuratorArgsSubscriptionPayload,
    GroupBelongsToCuratorSubscriptionPayload,
    GroupSubscriptionPayload,
  ],
});
