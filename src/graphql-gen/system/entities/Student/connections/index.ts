import { Schema } from '../../../common';

import addToStudentBelongsToCreatedBy from './addToStudentBelongsToCreatedBy';
import removeFromStudentBelongsToCreatedBy from './removeFromStudentBelongsToCreatedBy';
import addToStudentBelongsToUpdateBy from './addToStudentBelongsToUpdateBy';
import removeFromStudentBelongsToUpdateBy from './removeFromStudentBelongsToUpdateBy';
import addToStudentBelongsToCreatedByInput from './addToStudentBelongsToCreatedByInput';
import addToStudentBelongsToCreatedByPayload from './addToStudentBelongsToCreatedByPayload';
import removeFromStudentBelongsToCreatedByInput from './removeFromStudentBelongsToCreatedByInput';
import removeFromStudentBelongsToCreatedByPayload from './removeFromStudentBelongsToCreatedByPayload';
import addToStudentBelongsToUpdateByInput from './addToStudentBelongsToUpdateByInput';
import addToStudentBelongsToUpdateByPayload from './addToStudentBelongsToUpdateByPayload';
import removeFromStudentBelongsToUpdateByInput from './removeFromStudentBelongsToUpdateByInput';
import removeFromStudentBelongsToUpdateByPayload from './removeFromStudentBelongsToUpdateByPayload';

export default new Schema({
  name: 'Student.connections',
  items: [
    addToStudentBelongsToCreatedBy,
    removeFromStudentBelongsToCreatedBy,
    addToStudentBelongsToUpdateBy,
    removeFromStudentBelongsToUpdateBy,
    addToStudentBelongsToCreatedByInput,
    addToStudentBelongsToCreatedByPayload,
    removeFromStudentBelongsToCreatedByInput,
    removeFromStudentBelongsToCreatedByPayload,
    addToStudentBelongsToUpdateByInput,
    addToStudentBelongsToUpdateByPayload,
    removeFromStudentBelongsToUpdateByInput,
    removeFromStudentBelongsToUpdateByPayload,
  ],
});
