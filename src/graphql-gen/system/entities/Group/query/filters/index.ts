import EmbedGroupFilter from './EmbedGroupFilter';
import EmbedGroupFilterItem from './EmbedGroupFilterItem';
import GroupFilter from './GroupFilter';
import GroupFilterItem from './GroupFilterItem';
import GroupFilterSubscriptions from './GroupFilterSubscriptions';
import GroupFilterSubscriptionsItem from './GroupFilterSubscriptionsItem';
import { Schema } from '../../../../common';

export default new Schema({
  name: 'Group.queries.filter',
  items: [
    GroupFilterItem,
    GroupFilter,
    GroupFilterSubscriptionsItem,
    GroupFilterSubscriptions,
    EmbedGroupFilter,
    EmbedGroupFilterItem,
  ],
});
