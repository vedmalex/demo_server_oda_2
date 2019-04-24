import EmbedPhoneFilter from './EmbedPhoneFilter';
import EmbedPhoneFilterItem from './EmbedPhoneFilterItem';
import PhoneFilter from './PhoneFilter';
import PhoneFilterItem from './PhoneFilterItem';
import PhoneFilterSubscriptions from './PhoneFilterSubscriptions';
import PhoneFilterSubscriptionsItem from './PhoneFilterSubscriptionsItem';
import { Schema } from '../../../../common';

export default new Schema({
  name: 'Phone.queries.filter',
  items: [
    PhoneFilterItem,
    PhoneFilter,
    PhoneFilterSubscriptionsItem,
    PhoneFilterSubscriptions,
    EmbedPhoneFilter,
    EmbedPhoneFilterItem,
  ],
});
