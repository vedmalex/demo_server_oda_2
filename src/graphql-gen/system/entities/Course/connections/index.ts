import { Schema } from '../../../common';

import addToCourseBelongsToCreatedBy from './addToCourseBelongsToCreatedBy';
import removeFromCourseBelongsToCreatedBy from './removeFromCourseBelongsToCreatedBy';
import addToCourseBelongsToUpdateBy from './addToCourseBelongsToUpdateBy';
import removeFromCourseBelongsToUpdateBy from './removeFromCourseBelongsToUpdateBy';
import addToCourseBelongsToCreatedByInput from './addToCourseBelongsToCreatedByInput';
import addToCourseBelongsToCreatedByPayload from './addToCourseBelongsToCreatedByPayload';
import removeFromCourseBelongsToCreatedByInput from './removeFromCourseBelongsToCreatedByInput';
import removeFromCourseBelongsToCreatedByPayload from './removeFromCourseBelongsToCreatedByPayload';
import addToCourseBelongsToUpdateByInput from './addToCourseBelongsToUpdateByInput';
import addToCourseBelongsToUpdateByPayload from './addToCourseBelongsToUpdateByPayload';
import removeFromCourseBelongsToUpdateByInput from './removeFromCourseBelongsToUpdateByInput';
import removeFromCourseBelongsToUpdateByPayload from './removeFromCourseBelongsToUpdateByPayload';

export default new Schema({
  name: 'Course.connections',
  items: [
    addToCourseBelongsToCreatedBy,
    removeFromCourseBelongsToCreatedBy,
    addToCourseBelongsToUpdateBy,
    removeFromCourseBelongsToUpdateBy,
    addToCourseBelongsToCreatedByInput,
    addToCourseBelongsToCreatedByPayload,
    removeFromCourseBelongsToCreatedByInput,
    removeFromCourseBelongsToCreatedByPayload,
    addToCourseBelongsToUpdateByInput,
    addToCourseBelongsToUpdateByPayload,
    removeFromCourseBelongsToUpdateByInput,
    removeFromCourseBelongsToUpdateByPayload,
  ],
});
