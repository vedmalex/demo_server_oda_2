import { Schema } from '../../../common';

import addToSocialNetworkBelongsToPerson from './addToSocialNetworkBelongsToPerson';
import removeFromSocialNetworkBelongsToPerson from './removeFromSocialNetworkBelongsToPerson';
import addToSocialNetworkBelongsToPersonInput from './addToSocialNetworkBelongsToPersonInput';
import addToSocialNetworkBelongsToPersonPayload from './addToSocialNetworkBelongsToPersonPayload';
import removeFromSocialNetworkBelongsToPersonInput from './removeFromSocialNetworkBelongsToPersonInput';
import removeFromSocialNetworkBelongsToPersonPayload from './removeFromSocialNetworkBelongsToPersonPayload';

export default new Schema({
  name: 'SocialNetwork.connections',
  items: [
    addToSocialNetworkBelongsToPerson,
    removeFromSocialNetworkBelongsToPerson,
    addToSocialNetworkBelongsToPersonInput,
    addToSocialNetworkBelongsToPersonPayload,
    removeFromSocialNetworkBelongsToPersonInput,
    removeFromSocialNetworkBelongsToPersonPayload,
  ],
});
