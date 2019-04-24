import Meeting from './Meeting';
import UpdateMeetingSubscriptionPayload from './UpdateMeetingSubscriptionPayload';
import MeetingSubscription from './MeetingSubscription';
import MeetingBelongsToCreatedByArgsSubscriptionPayload from './MeetingBelongsToCreatedByArgsSubscriptionPayload';
import MeetingBelongsToCreatedBySubscriptionPayload from './MeetingBelongsToCreatedBySubscriptionPayload';
import MeetingBelongsToUpdateByArgsSubscriptionPayload from './MeetingBelongsToUpdateByArgsSubscriptionPayload';
import MeetingBelongsToUpdateBySubscriptionPayload from './MeetingBelongsToUpdateBySubscriptionPayload';
import MeetingSubscriptionPayload from './MeetingSubscriptionPayload';
import { Schema } from '../../../common';

export default new Schema({
  name: 'Meeting.subscriptions',
  items: [
    Meeting,
    UpdateMeetingSubscriptionPayload,
    MeetingSubscription,
    MeetingBelongsToCreatedByArgsSubscriptionPayload,
    MeetingBelongsToCreatedBySubscriptionPayload,
    MeetingBelongsToUpdateByArgsSubscriptionPayload,
    MeetingBelongsToUpdateBySubscriptionPayload,
    MeetingSubscriptionPayload,
  ],
});
