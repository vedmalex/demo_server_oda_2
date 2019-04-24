import { Schema } from '../../../common';

import addToSubjectBelongsToCreatedBy from './addToSubjectBelongsToCreatedBy';
import removeFromSubjectBelongsToCreatedBy from './removeFromSubjectBelongsToCreatedBy';
import addToSubjectBelongsToUpdateBy from './addToSubjectBelongsToUpdateBy';
import removeFromSubjectBelongsToUpdateBy from './removeFromSubjectBelongsToUpdateBy';
import addToSubjectBelongsToCreatedByInput from './addToSubjectBelongsToCreatedByInput';
import addToSubjectBelongsToCreatedByPayload from './addToSubjectBelongsToCreatedByPayload';
import removeFromSubjectBelongsToCreatedByInput from './removeFromSubjectBelongsToCreatedByInput';
import removeFromSubjectBelongsToCreatedByPayload from './removeFromSubjectBelongsToCreatedByPayload';
import addToSubjectBelongsToUpdateByInput from './addToSubjectBelongsToUpdateByInput';
import addToSubjectBelongsToUpdateByPayload from './addToSubjectBelongsToUpdateByPayload';
import removeFromSubjectBelongsToUpdateByInput from './removeFromSubjectBelongsToUpdateByInput';
import removeFromSubjectBelongsToUpdateByPayload from './removeFromSubjectBelongsToUpdateByPayload';

export default new Schema({
  name: 'Subject.connections',
  items: [
    addToSubjectBelongsToCreatedBy,
    removeFromSubjectBelongsToCreatedBy,
    addToSubjectBelongsToUpdateBy,
    removeFromSubjectBelongsToUpdateBy,
    addToSubjectBelongsToCreatedByInput,
    addToSubjectBelongsToCreatedByPayload,
    removeFromSubjectBelongsToCreatedByInput,
    removeFromSubjectBelongsToCreatedByPayload,
    addToSubjectBelongsToUpdateByInput,
    addToSubjectBelongsToUpdateByPayload,
    removeFromSubjectBelongsToUpdateByInput,
    removeFromSubjectBelongsToUpdateByPayload,
  ],
});
