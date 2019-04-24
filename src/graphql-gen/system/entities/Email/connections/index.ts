import { Schema } from '../../../common';

import addToEmailBelongsToCreatedBy from './addToEmailBelongsToCreatedBy';
import removeFromEmailBelongsToCreatedBy from './removeFromEmailBelongsToCreatedBy';
import addToEmailBelongsToUpdateBy from './addToEmailBelongsToUpdateBy';
import removeFromEmailBelongsToUpdateBy from './removeFromEmailBelongsToUpdateBy';
import addToEmailBelongsToCreatedByInput from './addToEmailBelongsToCreatedByInput';
import addToEmailBelongsToCreatedByPayload from './addToEmailBelongsToCreatedByPayload';
import removeFromEmailBelongsToCreatedByInput from './removeFromEmailBelongsToCreatedByInput';
import removeFromEmailBelongsToCreatedByPayload from './removeFromEmailBelongsToCreatedByPayload';
import addToEmailBelongsToUpdateByInput from './addToEmailBelongsToUpdateByInput';
import addToEmailBelongsToUpdateByPayload from './addToEmailBelongsToUpdateByPayload';
import removeFromEmailBelongsToUpdateByInput from './removeFromEmailBelongsToUpdateByInput';
import removeFromEmailBelongsToUpdateByPayload from './removeFromEmailBelongsToUpdateByPayload';

export default new Schema({
  name: 'Email.connections',
  items: [
    addToEmailBelongsToCreatedBy,
    removeFromEmailBelongsToCreatedBy,
    addToEmailBelongsToUpdateBy,
    removeFromEmailBelongsToUpdateBy,
    addToEmailBelongsToCreatedByInput,
    addToEmailBelongsToCreatedByPayload,
    removeFromEmailBelongsToCreatedByInput,
    removeFromEmailBelongsToCreatedByPayload,
    addToEmailBelongsToUpdateByInput,
    addToEmailBelongsToUpdateByPayload,
    removeFromEmailBelongsToUpdateByInput,
    removeFromEmailBelongsToUpdateByPayload,
  ],
});
