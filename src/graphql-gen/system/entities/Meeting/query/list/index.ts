import MeetingsEdge from './MeetingsEdge';
import MeetingsConnection from './MeetingsConnection';
import MeetingBelongsToManyStudentsConnection from './MeetingBelongsToManyStudentsConnection';
import MeetingBelongsToManyStudentsEdge from './MeetingBelongsToManyStudentsEdge';
import meetingItems from './meetingItems';
import meetings from './meetings';
import MeetingSortOrder from './MeetingSortOrder';
import MeetingComplexFilter from './MeetingComplexFilter';
import { Schema } from '../../../../common';
export default new Schema({
  name: 'Meeting.queries.list',
  items: [
    MeetingsEdge,
    MeetingsConnection,
    MeetingBelongsToManyStudentsConnection,
    MeetingBelongsToManyStudentsEdge,
    meetingItems,
    meetings,
    MeetingSortOrder,
    MeetingComplexFilter,
  ],
});
