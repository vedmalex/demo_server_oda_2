import { Schema } from '../../../../common';
import deleteManyMeeting from './deleteManyMeeting';
import deleteManyMeetingInput from './deleteManyMeetingInput';
import deleteManyMeetingPayload from './deleteManyMeetingPayload';

export default new Schema({
  name: 'Meeting.mutation.deleteMany',
  items: [deleteManyMeeting, deleteManyMeetingInput, deleteManyMeetingPayload],
});
