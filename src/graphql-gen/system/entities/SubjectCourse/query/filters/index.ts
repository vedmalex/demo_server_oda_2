import EmbedSubjectCourseFilter from './EmbedSubjectCourseFilter';
import EmbedSubjectCourseFilterItem from './EmbedSubjectCourseFilterItem';
import SubjectCourseFilter from './SubjectCourseFilter';
import SubjectCourseFilterItem from './SubjectCourseFilterItem';
import SubjectCourseFilterSubscriptions from './SubjectCourseFilterSubscriptions';
import SubjectCourseFilterSubscriptionsItem from './SubjectCourseFilterSubscriptionsItem';
import { Schema } from '../../../../common';

export default new Schema({
  name: 'SubjectCourse.queries.filter',
  items: [
    SubjectCourseFilterItem,
    SubjectCourseFilter,
    SubjectCourseFilterSubscriptionsItem,
    SubjectCourseFilterSubscriptions,
    EmbedSubjectCourseFilter,
    EmbedSubjectCourseFilterItem,
  ],
});
