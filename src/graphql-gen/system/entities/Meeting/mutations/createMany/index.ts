import { Schema } from '../../../../common';
import createManyMeeting from './createManyMeeting';
import createManyMeetingInput from './createManyMeetingInput';
import createManyMeetingPayload from './createManyMeetingPayload';

import embedStudentCreateIntoMeetingStudentsInput from './embedStudentCreateIntoMeetingStudentsInput';

export default new Schema({
  name: 'Meeting.mutation.createMany',
  items: [
    embedStudentCreateIntoMeetingStudentsInput,
    createManyMeeting,
    createManyMeetingInput,
    createManyMeetingPayload,
  ],
});
