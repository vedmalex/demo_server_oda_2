import { Schema } from '../../../common';

import addToStudentAttendanceBelongsToCreatedBy from './addToStudentAttendanceBelongsToCreatedBy';
import removeFromStudentAttendanceBelongsToCreatedBy from './removeFromStudentAttendanceBelongsToCreatedBy';
import addToStudentAttendanceBelongsToUpdateBy from './addToStudentAttendanceBelongsToUpdateBy';
import removeFromStudentAttendanceBelongsToUpdateBy from './removeFromStudentAttendanceBelongsToUpdateBy';
import addToStudentAttendanceBelongsToCreatedByInput from './addToStudentAttendanceBelongsToCreatedByInput';
import addToStudentAttendanceBelongsToCreatedByPayload from './addToStudentAttendanceBelongsToCreatedByPayload';
import removeFromStudentAttendanceBelongsToCreatedByInput from './removeFromStudentAttendanceBelongsToCreatedByInput';
import removeFromStudentAttendanceBelongsToCreatedByPayload from './removeFromStudentAttendanceBelongsToCreatedByPayload';
import addToStudentAttendanceBelongsToUpdateByInput from './addToStudentAttendanceBelongsToUpdateByInput';
import addToStudentAttendanceBelongsToUpdateByPayload from './addToStudentAttendanceBelongsToUpdateByPayload';
import removeFromStudentAttendanceBelongsToUpdateByInput from './removeFromStudentAttendanceBelongsToUpdateByInput';
import removeFromStudentAttendanceBelongsToUpdateByPayload from './removeFromStudentAttendanceBelongsToUpdateByPayload';

export default new Schema({
  name: 'StudentAttendance.connections',
  items: [
    addToStudentAttendanceBelongsToCreatedBy,
    removeFromStudentAttendanceBelongsToCreatedBy,
    addToStudentAttendanceBelongsToUpdateBy,
    removeFromStudentAttendanceBelongsToUpdateBy,
    addToStudentAttendanceBelongsToCreatedByInput,
    addToStudentAttendanceBelongsToCreatedByPayload,
    removeFromStudentAttendanceBelongsToCreatedByInput,
    removeFromStudentAttendanceBelongsToCreatedByPayload,
    addToStudentAttendanceBelongsToUpdateByInput,
    addToStudentAttendanceBelongsToUpdateByPayload,
    removeFromStudentAttendanceBelongsToUpdateByInput,
    removeFromStudentAttendanceBelongsToUpdateByPayload,
  ],
});
