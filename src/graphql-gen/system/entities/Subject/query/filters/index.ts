import EmbedSubjectFilter from './EmbedSubjectFilter';
import EmbedSubjectFilterItem from './EmbedSubjectFilterItem';
import SubjectFilter from './SubjectFilter';
import SubjectFilterItem from './SubjectFilterItem';
import SubjectFilterSubscriptions from './SubjectFilterSubscriptions';
import SubjectFilterSubscriptionsItem from './SubjectFilterSubscriptionsItem';
import { Schema } from '../../../../common';

export default new Schema({
  name: 'Subject.queries.filter',
  items: [
    SubjectFilterItem,
    SubjectFilter,
    SubjectFilterSubscriptionsItem,
    SubjectFilterSubscriptions,
    EmbedSubjectFilter,
    EmbedSubjectFilterItem,
  ],
});
