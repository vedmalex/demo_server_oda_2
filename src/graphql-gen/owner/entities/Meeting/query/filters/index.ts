import EmbedMeetingFilter from './EmbedMeetingFilter';
import EmbedMeetingFilterItem from './EmbedMeetingFilterItem';
import MeetingFilter from './MeetingFilter';
import MeetingFilterItem from './MeetingFilterItem';
import MeetingFilterSubscriptions from './MeetingFilterSubscriptions';
import MeetingFilterSubscriptionsItem from './MeetingFilterSubscriptionsItem';
import { Schema } from '../../../../common';

export default new Schema({
  name: 'Meeting.queries.filter',
  items: [
    MeetingFilterItem,
    MeetingFilter,
    MeetingFilterSubscriptionsItem,
    MeetingFilterSubscriptions,
    EmbedMeetingFilter,
    EmbedMeetingFilterItem,
  ],
});
