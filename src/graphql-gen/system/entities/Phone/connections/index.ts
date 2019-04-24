import { Schema } from '../../../common';

import addToPhoneBelongsToCreatedBy from './addToPhoneBelongsToCreatedBy';
import removeFromPhoneBelongsToCreatedBy from './removeFromPhoneBelongsToCreatedBy';
import addToPhoneBelongsToUpdateBy from './addToPhoneBelongsToUpdateBy';
import removeFromPhoneBelongsToUpdateBy from './removeFromPhoneBelongsToUpdateBy';
import addToPhoneBelongsToCreatedByInput from './addToPhoneBelongsToCreatedByInput';
import addToPhoneBelongsToCreatedByPayload from './addToPhoneBelongsToCreatedByPayload';
import removeFromPhoneBelongsToCreatedByInput from './removeFromPhoneBelongsToCreatedByInput';
import removeFromPhoneBelongsToCreatedByPayload from './removeFromPhoneBelongsToCreatedByPayload';
import addToPhoneBelongsToUpdateByInput from './addToPhoneBelongsToUpdateByInput';
import addToPhoneBelongsToUpdateByPayload from './addToPhoneBelongsToUpdateByPayload';
import removeFromPhoneBelongsToUpdateByInput from './removeFromPhoneBelongsToUpdateByInput';
import removeFromPhoneBelongsToUpdateByPayload from './removeFromPhoneBelongsToUpdateByPayload';

export default new Schema({
  name: 'Phone.connections',
  items: [
    addToPhoneBelongsToCreatedBy,
    removeFromPhoneBelongsToCreatedBy,
    addToPhoneBelongsToUpdateBy,
    removeFromPhoneBelongsToUpdateBy,
    addToPhoneBelongsToCreatedByInput,
    addToPhoneBelongsToCreatedByPayload,
    removeFromPhoneBelongsToCreatedByInput,
    removeFromPhoneBelongsToCreatedByPayload,
    addToPhoneBelongsToUpdateByInput,
    addToPhoneBelongsToUpdateByPayload,
    removeFromPhoneBelongsToUpdateByInput,
    removeFromPhoneBelongsToUpdateByPayload,
  ],
});
