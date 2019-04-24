import { Schema } from '../../../../common';
import updateSocialNetwork from './updateSocialNetwork';
import updateSocialNetworkInput from './updateSocialNetworkInput';
import updateSocialNetworkPayload from './updateSocialNetworkPayload';

export default new Schema({
  name: 'SocialNetwork.mutation.update',
  items: [
    updateSocialNetwork,
    updateSocialNetworkInput,
    updateSocialNetworkPayload,
  ],
});
