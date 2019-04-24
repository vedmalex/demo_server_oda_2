import { Schema } from '../../../common';

import addToGroupBelongsToCreatedBy from './addToGroupBelongsToCreatedBy';
import removeFromGroupBelongsToCreatedBy from './removeFromGroupBelongsToCreatedBy';
import addToGroupBelongsToUpdateBy from './addToGroupBelongsToUpdateBy';
import removeFromGroupBelongsToUpdateBy from './removeFromGroupBelongsToUpdateBy';
import addToGroupBelongsToCreatedByInput from './addToGroupBelongsToCreatedByInput';
import addToGroupBelongsToCreatedByPayload from './addToGroupBelongsToCreatedByPayload';
import removeFromGroupBelongsToCreatedByInput from './removeFromGroupBelongsToCreatedByInput';
import removeFromGroupBelongsToCreatedByPayload from './removeFromGroupBelongsToCreatedByPayload';
import addToGroupBelongsToUpdateByInput from './addToGroupBelongsToUpdateByInput';
import addToGroupBelongsToUpdateByPayload from './addToGroupBelongsToUpdateByPayload';
import removeFromGroupBelongsToUpdateByInput from './removeFromGroupBelongsToUpdateByInput';
import removeFromGroupBelongsToUpdateByPayload from './removeFromGroupBelongsToUpdateByPayload';

export default new Schema({
  name: 'Group.connections',
  items: [
    addToGroupBelongsToCreatedBy,
    removeFromGroupBelongsToCreatedBy,
    addToGroupBelongsToUpdateBy,
    removeFromGroupBelongsToUpdateBy,
    addToGroupBelongsToCreatedByInput,
    addToGroupBelongsToCreatedByPayload,
    removeFromGroupBelongsToCreatedByInput,
    removeFromGroupBelongsToCreatedByPayload,
    addToGroupBelongsToUpdateByInput,
    addToGroupBelongsToUpdateByPayload,
    removeFromGroupBelongsToUpdateByInput,
    removeFromGroupBelongsToUpdateByPayload,
  ],
});
