import Meeting from './Meeting';
import UpdateMeetingSubscriptionPayload from './UpdateMeetingSubscriptionPayload';
import MeetingSubscription from './MeetingSubscription';
import MeetingBelongsToCuratorArgsSubscriptionPayload from './MeetingBelongsToCuratorArgsSubscriptionPayload';
import MeetingBelongsToCuratorSubscriptionPayload from './MeetingBelongsToCuratorSubscriptionPayload';
import MeetingBelongsToGroupArgsSubscriptionPayload from './MeetingBelongsToGroupArgsSubscriptionPayload';
import MeetingBelongsToGroupSubscriptionPayload from './MeetingBelongsToGroupSubscriptionPayload';
import MeetingBelongsToManyStudentsArgsSubscriptionPayload from './MeetingBelongsToManyStudentsArgsSubscriptionPayload';
import MeetingBelongsToManyStudentsSubscriptionPayload from './MeetingBelongsToManyStudentsSubscriptionPayload';
import MeetingSubscriptionPayload from './MeetingSubscriptionPayload';
import { Schema } from '../../../common';

export default new Schema({
  name: 'Meeting.subscriptions',
  items: [
    Meeting,
    UpdateMeetingSubscriptionPayload,
    MeetingSubscription,
    MeetingBelongsToCuratorArgsSubscriptionPayload,
    MeetingBelongsToCuratorSubscriptionPayload,
    MeetingBelongsToGroupArgsSubscriptionPayload,
    MeetingBelongsToGroupSubscriptionPayload,
    MeetingBelongsToManyStudentsArgsSubscriptionPayload,
    MeetingBelongsToManyStudentsSubscriptionPayload,
    MeetingSubscriptionPayload,
  ],
});
