import EmbedPersonFilter from './EmbedPersonFilter';
import EmbedPersonFilterItem from './EmbedPersonFilterItem';
import PersonFilter from './PersonFilter';
import PersonFilterItem from './PersonFilterItem';
import PersonFilterSubscriptions from './PersonFilterSubscriptions';
import PersonFilterSubscriptionsItem from './PersonFilterSubscriptionsItem';
import { Schema } from '../../../../common';

export default new Schema({
  name: 'Person.queries.filter',
  items: [
    PersonFilterItem,
    PersonFilter,
    PersonFilterSubscriptionsItem,
    PersonFilterSubscriptions,
    EmbedPersonFilter,
    EmbedPersonFilterItem,
  ],
});
