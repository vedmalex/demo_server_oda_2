import { Schema } from '../../../../common';
import deleteManySocialNetwork from './deleteManySocialNetwork';
import deleteManySocialNetworkInput from './deleteManySocialNetworkInput';
import deleteManySocialNetworkPayload from './deleteManySocialNetworkPayload';

export default new Schema({
  name: 'SocialNetwork.mutation.deleteMany',
  items: [
    deleteManySocialNetwork,
    deleteManySocialNetworkInput,
    deleteManySocialNetworkPayload,
  ],
});
