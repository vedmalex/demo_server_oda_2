import { Schema } from '../../../common';

import addToSocialNetworkBelongsToCreatedBy from './addToSocialNetworkBelongsToCreatedBy';
import removeFromSocialNetworkBelongsToCreatedBy from './removeFromSocialNetworkBelongsToCreatedBy';
import addToSocialNetworkBelongsToUpdateBy from './addToSocialNetworkBelongsToUpdateBy';
import removeFromSocialNetworkBelongsToUpdateBy from './removeFromSocialNetworkBelongsToUpdateBy';
import addToSocialNetworkBelongsToCreatedByInput from './addToSocialNetworkBelongsToCreatedByInput';
import addToSocialNetworkBelongsToCreatedByPayload from './addToSocialNetworkBelongsToCreatedByPayload';
import removeFromSocialNetworkBelongsToCreatedByInput from './removeFromSocialNetworkBelongsToCreatedByInput';
import removeFromSocialNetworkBelongsToCreatedByPayload from './removeFromSocialNetworkBelongsToCreatedByPayload';
import addToSocialNetworkBelongsToUpdateByInput from './addToSocialNetworkBelongsToUpdateByInput';
import addToSocialNetworkBelongsToUpdateByPayload from './addToSocialNetworkBelongsToUpdateByPayload';
import removeFromSocialNetworkBelongsToUpdateByInput from './removeFromSocialNetworkBelongsToUpdateByInput';
import removeFromSocialNetworkBelongsToUpdateByPayload from './removeFromSocialNetworkBelongsToUpdateByPayload';

export default new Schema({
  name: 'SocialNetwork.connections',
  items: [
    addToSocialNetworkBelongsToCreatedBy,
    removeFromSocialNetworkBelongsToCreatedBy,
    addToSocialNetworkBelongsToUpdateBy,
    removeFromSocialNetworkBelongsToUpdateBy,
    addToSocialNetworkBelongsToCreatedByInput,
    addToSocialNetworkBelongsToCreatedByPayload,
    removeFromSocialNetworkBelongsToCreatedByInput,
    removeFromSocialNetworkBelongsToCreatedByPayload,
    addToSocialNetworkBelongsToUpdateByInput,
    addToSocialNetworkBelongsToUpdateByPayload,
    removeFromSocialNetworkBelongsToUpdateByInput,
    removeFromSocialNetworkBelongsToUpdateByPayload,
  ],
});
