import { Schema } from '../../../common';

import addToCuratorBelongsToCreatedBy from './addToCuratorBelongsToCreatedBy';
import removeFromCuratorBelongsToCreatedBy from './removeFromCuratorBelongsToCreatedBy';
import addToCuratorBelongsToUpdateBy from './addToCuratorBelongsToUpdateBy';
import removeFromCuratorBelongsToUpdateBy from './removeFromCuratorBelongsToUpdateBy';
import addToCuratorBelongsToCreatedByInput from './addToCuratorBelongsToCreatedByInput';
import addToCuratorBelongsToCreatedByPayload from './addToCuratorBelongsToCreatedByPayload';
import removeFromCuratorBelongsToCreatedByInput from './removeFromCuratorBelongsToCreatedByInput';
import removeFromCuratorBelongsToCreatedByPayload from './removeFromCuratorBelongsToCreatedByPayload';
import addToCuratorBelongsToUpdateByInput from './addToCuratorBelongsToUpdateByInput';
import addToCuratorBelongsToUpdateByPayload from './addToCuratorBelongsToUpdateByPayload';
import removeFromCuratorBelongsToUpdateByInput from './removeFromCuratorBelongsToUpdateByInput';
import removeFromCuratorBelongsToUpdateByPayload from './removeFromCuratorBelongsToUpdateByPayload';

export default new Schema({
  name: 'Curator.connections',
  items: [
    addToCuratorBelongsToCreatedBy,
    removeFromCuratorBelongsToCreatedBy,
    addToCuratorBelongsToUpdateBy,
    removeFromCuratorBelongsToUpdateBy,
    addToCuratorBelongsToCreatedByInput,
    addToCuratorBelongsToCreatedByPayload,
    removeFromCuratorBelongsToCreatedByInput,
    removeFromCuratorBelongsToCreatedByPayload,
    addToCuratorBelongsToUpdateByInput,
    addToCuratorBelongsToUpdateByPayload,
    removeFromCuratorBelongsToUpdateByInput,
    removeFromCuratorBelongsToUpdateByPayload,
  ],
});
