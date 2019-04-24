import socialNetwork from './socialNetwork';
import socialNetworkUniqueKeys from './socialNetworkUniqueKeys';
import { Schema } from '../../../../common';

export default new Schema({
  name: 'SocialNetwork.queries.single',
  items: [socialNetwork, socialNetworkUniqueKeys],
});
