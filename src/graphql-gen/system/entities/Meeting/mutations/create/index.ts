import { Schema } from '../../../../common';
import createMeeting from './createMeeting';
import createMeetingInput from './createMeetingInput';
import createMeetingPayload from './createMeetingPayload';

export default new Schema({
  name: 'Meeting.mutation.create',
  items: [createMeeting, createMeetingInput, createMeetingPayload],
});
