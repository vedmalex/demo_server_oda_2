import { Schema } from '../../../../common';
import updateMeeting from './updateMeeting';
import updateMeetingInput from './updateMeetingInput';
import updateMeetingPayload from './updateMeetingPayload';

import embedStudentUpdateIntoMeetingStudentsInput from './embedStudentUpdateIntoMeetingStudentsInput';

export default new Schema({
  name: 'Meeting.mutation.update',
  items: [
    embedStudentUpdateIntoMeetingStudentsInput,
    updateMeeting,
    updateMeetingInput,
    updateMeetingPayload,
  ],
});
