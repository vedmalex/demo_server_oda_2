import { Schema } from '../../../../common';
import updateMeeting from './updateMeeting';
import updateMeetingInput from './updateMeetingInput';
import updateMeetingPayload from './updateMeetingPayload';

export default new Schema({
  name: 'Meeting.mutation.update',
  items: [updateMeeting, updateMeetingInput, updateMeetingPayload],
});
