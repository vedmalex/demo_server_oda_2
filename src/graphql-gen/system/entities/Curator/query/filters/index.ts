import EmbedCuratorFilter from './EmbedCuratorFilter';
import EmbedCuratorFilterItem from './EmbedCuratorFilterItem';
import CuratorFilter from './CuratorFilter';
import CuratorFilterItem from './CuratorFilterItem';
import CuratorFilterSubscriptions from './CuratorFilterSubscriptions';
import CuratorFilterSubscriptionsItem from './CuratorFilterSubscriptionsItem';
import { Schema } from '../../../../common';

export default new Schema({
  name: 'Curator.queries.filter',
  items: [
    CuratorFilterItem,
    CuratorFilter,
    CuratorFilterSubscriptionsItem,
    CuratorFilterSubscriptions,
    EmbedCuratorFilter,
    EmbedCuratorFilterItem,
  ],
});
