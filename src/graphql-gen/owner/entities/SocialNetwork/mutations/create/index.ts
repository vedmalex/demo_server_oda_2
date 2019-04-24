import { Schema } from '../../../../common';
import createSocialNetwork from './createSocialNetwork';
import createSocialNetworkInput from './createSocialNetworkInput';
import createSocialNetworkPayload from './createSocialNetworkPayload';

export default new Schema({
  name: 'SocialNetwork.mutation.create',
  items: [
    createSocialNetwork,
    createSocialNetworkInput,
    createSocialNetworkPayload,
  ],
});
