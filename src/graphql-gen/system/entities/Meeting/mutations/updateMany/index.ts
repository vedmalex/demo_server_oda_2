import { Schema } from '../../../../common';
import updateManyMeeting from './updateManyMeeting';
import updateManyMeetingInput from './updateManyMeetingInput';
import updateManyMeetingPayload from './updateManyMeetingPayload';

import embedStudentUpdateIntoMeetingStudentsInput from './embedStudentUpdateIntoMeetingStudentsInput';

export default new Schema({
  name: 'Meeting.mutation.updateMany',
  items: [
    embedStudentUpdateIntoMeetingStudentsInput,
    updateManyMeeting,
    updateManyMeetingInput,
    updateManyMeetingPayload,
  ],
});
