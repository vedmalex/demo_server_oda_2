import SocialNetworksEdge from './SocialNetworksEdge';
import SocialNetworksConnection from './SocialNetworksConnection';
import socialNetworkItems from './socialNetworkItems';
import socialNetworks from './socialNetworks';
import SocialNetworkSortOrder from './SocialNetworkSortOrder';
import SocialNetworkComplexFilter from './SocialNetworkComplexFilter';
import { Schema } from '../../../../common';
export default new Schema({
  name: 'SocialNetwork.queries.list',
  items: [
    SocialNetworksEdge,
    SocialNetworksConnection,
    socialNetworkItems,
    socialNetworks,
    SocialNetworkSortOrder,
    SocialNetworkComplexFilter,
  ],
});
