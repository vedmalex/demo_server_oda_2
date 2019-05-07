import { Schema } from '../../../../common';
import createManySocialNetwork from './createManySocialNetwork';
import createManySocialNetworkInput from './createManySocialNetworkInput';
import createManySocialNetworkPayload from './createManySocialNetworkPayload';

export default new Schema({
  name: 'SocialNetwork.mutation.createMany',
  items: [
    createManySocialNetwork,
    createManySocialNetworkInput,
    createManySocialNetworkPayload,
  ],
});
