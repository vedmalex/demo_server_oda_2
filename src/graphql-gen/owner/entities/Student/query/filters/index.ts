import EmbedStudentFilter from './EmbedStudentFilter';
import EmbedStudentFilterItem from './EmbedStudentFilterItem';
import StudentFilter from './StudentFilter';
import StudentFilterItem from './StudentFilterItem';
import StudentFilterSubscriptions from './StudentFilterSubscriptions';
import StudentFilterSubscriptionsItem from './StudentFilterSubscriptionsItem';
import { Schema } from '../../../../common';

export default new Schema({
  name: 'Student.queries.filter',
  items: [
    StudentFilterItem,
    StudentFilter,
    StudentFilterSubscriptionsItem,
    StudentFilterSubscriptions,
    EmbedStudentFilter,
    EmbedStudentFilterItem,
  ],
});
