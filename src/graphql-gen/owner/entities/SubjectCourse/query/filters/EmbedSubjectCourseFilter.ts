import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input EmbedSubjectCourseFilter {
      or: [EmbedSubjectCourseFilterItem]
      and: [EmbedSubjectCourseFilterItem]
      some: SubjectCourseFilter
      none: SubjectCourseFilter
      every: SubjectCourseFilter
    }
  `,
});
