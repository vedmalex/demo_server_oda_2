import create from './create';
import _delete from './delete';
import update from './update';
import embedSocialNetworkInput from './embedSocialNetworkInput';

import { Schema } from '../../../common';

export default new Schema({
  name: 'SocialNetwork.mutations',
  items: [create, _delete, update, embedSocialNetworkInput],
});
