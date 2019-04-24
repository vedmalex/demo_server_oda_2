import { Schema } from '../../../common';

import addToPersonBelongsToCreatedBy from './addToPersonBelongsToCreatedBy';
import removeFromPersonBelongsToCreatedBy from './removeFromPersonBelongsToCreatedBy';
import addToPersonBelongsToUpdateBy from './addToPersonBelongsToUpdateBy';
import removeFromPersonBelongsToUpdateBy from './removeFromPersonBelongsToUpdateBy';
import addToPersonBelongsToCreatedByInput from './addToPersonBelongsToCreatedByInput';
import addToPersonBelongsToCreatedByPayload from './addToPersonBelongsToCreatedByPayload';
import removeFromPersonBelongsToCreatedByInput from './removeFromPersonBelongsToCreatedByInput';
import removeFromPersonBelongsToCreatedByPayload from './removeFromPersonBelongsToCreatedByPayload';
import addToPersonBelongsToUpdateByInput from './addToPersonBelongsToUpdateByInput';
import addToPersonBelongsToUpdateByPayload from './addToPersonBelongsToUpdateByPayload';
import removeFromPersonBelongsToUpdateByInput from './removeFromPersonBelongsToUpdateByInput';
import removeFromPersonBelongsToUpdateByPayload from './removeFromPersonBelongsToUpdateByPayload';

export default new Schema({
  name: 'Person.connections',
  items: [
    addToPersonBelongsToCreatedBy,
    removeFromPersonBelongsToCreatedBy,
    addToPersonBelongsToUpdateBy,
    removeFromPersonBelongsToUpdateBy,
    addToPersonBelongsToCreatedByInput,
    addToPersonBelongsToCreatedByPayload,
    removeFromPersonBelongsToCreatedByInput,
    removeFromPersonBelongsToCreatedByPayload,
    addToPersonBelongsToUpdateByInput,
    addToPersonBelongsToUpdateByPayload,
    removeFromPersonBelongsToUpdateByInput,
    removeFromPersonBelongsToUpdateByPayload,
  ],
});
