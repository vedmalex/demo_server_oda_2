import { Schema } from '../../../common';

import addToMeetingBelongsToCreatedBy from './addToMeetingBelongsToCreatedBy';
import removeFromMeetingBelongsToCreatedBy from './removeFromMeetingBelongsToCreatedBy';
import addToMeetingBelongsToUpdateBy from './addToMeetingBelongsToUpdateBy';
import removeFromMeetingBelongsToUpdateBy from './removeFromMeetingBelongsToUpdateBy';
import addToMeetingBelongsToCreatedByInput from './addToMeetingBelongsToCreatedByInput';
import addToMeetingBelongsToCreatedByPayload from './addToMeetingBelongsToCreatedByPayload';
import removeFromMeetingBelongsToCreatedByInput from './removeFromMeetingBelongsToCreatedByInput';
import removeFromMeetingBelongsToCreatedByPayload from './removeFromMeetingBelongsToCreatedByPayload';
import addToMeetingBelongsToUpdateByInput from './addToMeetingBelongsToUpdateByInput';
import addToMeetingBelongsToUpdateByPayload from './addToMeetingBelongsToUpdateByPayload';
import removeFromMeetingBelongsToUpdateByInput from './removeFromMeetingBelongsToUpdateByInput';
import removeFromMeetingBelongsToUpdateByPayload from './removeFromMeetingBelongsToUpdateByPayload';

export default new Schema({
  name: 'Meeting.connections',
  items: [
    addToMeetingBelongsToCreatedBy,
    removeFromMeetingBelongsToCreatedBy,
    addToMeetingBelongsToUpdateBy,
    removeFromMeetingBelongsToUpdateBy,
    addToMeetingBelongsToCreatedByInput,
    addToMeetingBelongsToCreatedByPayload,
    removeFromMeetingBelongsToCreatedByInput,
    removeFromMeetingBelongsToCreatedByPayload,
    addToMeetingBelongsToUpdateByInput,
    addToMeetingBelongsToUpdateByPayload,
    removeFromMeetingBelongsToUpdateByInput,
    removeFromMeetingBelongsToUpdateByPayload,
  ],
});
