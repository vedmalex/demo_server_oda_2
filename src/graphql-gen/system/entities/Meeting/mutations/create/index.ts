import { Schema } from '../../../../common';
import createMeeting from './createMeeting';
import createMeetingInput from './createMeetingInput';
import createMeetingPayload from './createMeetingPayload';

import embedStudentCreateIntoMeetingStudentsInput from './embedStudentCreateIntoMeetingStudentsInput';

export default new Schema({
  name: 'Meeting.mutation.create',
  items: [
    embedStudentCreateIntoMeetingStudentsInput,
    createMeeting,
    createMeetingInput,
    createMeetingPayload,
  ],
});
