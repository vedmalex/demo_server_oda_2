import { Schema } from '../../../common';

import addToSubjectCourseBelongsToCreatedBy from './addToSubjectCourseBelongsToCreatedBy';
import removeFromSubjectCourseBelongsToCreatedBy from './removeFromSubjectCourseBelongsToCreatedBy';
import addToSubjectCourseBelongsToUpdateBy from './addToSubjectCourseBelongsToUpdateBy';
import removeFromSubjectCourseBelongsToUpdateBy from './removeFromSubjectCourseBelongsToUpdateBy';
import addToSubjectCourseBelongsToCreatedByInput from './addToSubjectCourseBelongsToCreatedByInput';
import addToSubjectCourseBelongsToCreatedByPayload from './addToSubjectCourseBelongsToCreatedByPayload';
import removeFromSubjectCourseBelongsToCreatedByInput from './removeFromSubjectCourseBelongsToCreatedByInput';
import removeFromSubjectCourseBelongsToCreatedByPayload from './removeFromSubjectCourseBelongsToCreatedByPayload';
import addToSubjectCourseBelongsToUpdateByInput from './addToSubjectCourseBelongsToUpdateByInput';
import addToSubjectCourseBelongsToUpdateByPayload from './addToSubjectCourseBelongsToUpdateByPayload';
import removeFromSubjectCourseBelongsToUpdateByInput from './removeFromSubjectCourseBelongsToUpdateByInput';
import removeFromSubjectCourseBelongsToUpdateByPayload from './removeFromSubjectCourseBelongsToUpdateByPayload';

export default new Schema({
  name: 'SubjectCourse.connections',
  items: [
    addToSubjectCourseBelongsToCreatedBy,
    removeFromSubjectCourseBelongsToCreatedBy,
    addToSubjectCourseBelongsToUpdateBy,
    removeFromSubjectCourseBelongsToUpdateBy,
    addToSubjectCourseBelongsToCreatedByInput,
    addToSubjectCourseBelongsToCreatedByPayload,
    removeFromSubjectCourseBelongsToCreatedByInput,
    removeFromSubjectCourseBelongsToCreatedByPayload,
    addToSubjectCourseBelongsToUpdateByInput,
    addToSubjectCourseBelongsToUpdateByPayload,
    removeFromSubjectCourseBelongsToUpdateByInput,
    removeFromSubjectCourseBelongsToUpdateByPayload,
  ],
});
