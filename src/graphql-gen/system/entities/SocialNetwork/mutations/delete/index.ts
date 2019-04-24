import { Schema } from '../../../../common';
import deleteSocialNetwork from './deleteSocialNetwork';
import deleteSocialNetworkInput from './deleteSocialNetworkInput';
import deleteSocialNetworkPayload from './deleteSocialNetworkPayload';

export default new Schema({
  name: 'SocialNetwork.mutation.delete',
  items: [
    deleteSocialNetwork,
    deleteSocialNetworkInput,
    deleteSocialNetworkPayload,
  ],
});
