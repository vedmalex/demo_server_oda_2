import EmbedEmailFilter from './EmbedEmailFilter';
import EmbedEmailFilterItem from './EmbedEmailFilterItem';
import EmailFilter from './EmailFilter';
import EmailFilterItem from './EmailFilterItem';
import EmailFilterSubscriptions from './EmailFilterSubscriptions';
import EmailFilterSubscriptionsItem from './EmailFilterSubscriptionsItem';
import { Schema } from '../../../../common';

export default new Schema({
  name: 'Email.queries.filter',
  items: [
    EmailFilterItem,
    EmailFilter,
    EmailFilterSubscriptionsItem,
    EmailFilterSubscriptions,
    EmbedEmailFilter,
    EmbedEmailFilterItem,
  ],
});
