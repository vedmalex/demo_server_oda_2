import { Schema } from '../../../common';

import addToStudentAttendanceBelongsToMeetingLink from './addToStudentAttendanceBelongsToMeetingLink';
import removeFromStudentAttendanceBelongsToMeetingLink from './removeFromStudentAttendanceBelongsToMeetingLink';
import addToStudentAttendanceBelongsToStudentLink from './addToStudentAttendanceBelongsToStudentLink';
import removeFromStudentAttendanceBelongsToStudentLink from './removeFromStudentAttendanceBelongsToStudentLink';
import addToStudentAttendanceBelongsToMeetingLinkInput from './addToStudentAttendanceBelongsToMeetingLinkInput';
import addToStudentAttendanceBelongsToMeetingLinkPayload from './addToStudentAttendanceBelongsToMeetingLinkPayload';
import removeFromStudentAttendanceBelongsToMeetingLinkInput from './removeFromStudentAttendanceBelongsToMeetingLinkInput';
import removeFromStudentAttendanceBelongsToMeetingLinkPayload from './removeFromStudentAttendanceBelongsToMeetingLinkPayload';
import addToStudentAttendanceBelongsToStudentLinkInput from './addToStudentAttendanceBelongsToStudentLinkInput';
import addToStudentAttendanceBelongsToStudentLinkPayload from './addToStudentAttendanceBelongsToStudentLinkPayload';
import removeFromStudentAttendanceBelongsToStudentLinkInput from './removeFromStudentAttendanceBelongsToStudentLinkInput';
import removeFromStudentAttendanceBelongsToStudentLinkPayload from './removeFromStudentAttendanceBelongsToStudentLinkPayload';

export default new Schema({
  name: 'StudentAttendance.connections',
  items: [
    addToStudentAttendanceBelongsToMeetingLink,
    removeFromStudentAttendanceBelongsToMeetingLink,
    addToStudentAttendanceBelongsToStudentLink,
    removeFromStudentAttendanceBelongsToStudentLink,
    addToStudentAttendanceBelongsToMeetingLinkInput,
    addToStudentAttendanceBelongsToMeetingLinkPayload,
    removeFromStudentAttendanceBelongsToMeetingLinkInput,
    removeFromStudentAttendanceBelongsToMeetingLinkPayload,
    addToStudentAttendanceBelongsToStudentLinkInput,
    addToStudentAttendanceBelongsToStudentLinkPayload,
    removeFromStudentAttendanceBelongsToStudentLinkInput,
    removeFromStudentAttendanceBelongsToStudentLinkPayload,
  ],
});
