import { Schema } from '../../../../common';
import updateManySocialNetwork from './updateManySocialNetwork';
import updateManySocialNetworkInput from './updateManySocialNetworkInput';
import updateManySocialNetworkPayload from './updateManySocialNetworkPayload';

export default new Schema({
  name: 'SocialNetwork.mutation.updateMany',
  items: [
    updateManySocialNetwork,
    updateManySocialNetworkInput,
    updateManySocialNetworkPayload,
  ],
});
