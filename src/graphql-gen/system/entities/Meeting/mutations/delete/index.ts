import { Schema } from '../../../../common';
import deleteMeeting from './deleteMeeting';
import deleteMeetingInput from './deleteMeetingInput';
import deleteMeetingPayload from './deleteMeetingPayload';

export default new Schema({
  name: 'Meeting.mutation.delete',
  items: [deleteMeeting, deleteMeetingInput, deleteMeetingPayload],
});
