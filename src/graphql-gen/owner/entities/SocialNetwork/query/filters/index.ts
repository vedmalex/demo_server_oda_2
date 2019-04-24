import EmbedSocialNetworkFilter from './EmbedSocialNetworkFilter';
import EmbedSocialNetworkFilterItem from './EmbedSocialNetworkFilterItem';
import SocialNetworkFilter from './SocialNetworkFilter';
import SocialNetworkFilterItem from './SocialNetworkFilterItem';
import SocialNetworkFilterSubscriptions from './SocialNetworkFilterSubscriptions';
import SocialNetworkFilterSubscriptionsItem from './SocialNetworkFilterSubscriptionsItem';
import { Schema } from '../../../../common';

export default new Schema({
  name: 'SocialNetwork.queries.filter',
  items: [
    SocialNetworkFilterItem,
    SocialNetworkFilter,
    SocialNetworkFilterSubscriptionsItem,
    SocialNetworkFilterSubscriptions,
    EmbedSocialNetworkFilter,
    EmbedSocialNetworkFilterItem,
  ],
});
