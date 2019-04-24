import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input EmbedSubjectCourseFilterItem {
      some: SubjectCourseFilter
      none: SubjectCourseFilter
      every: SubjectCourseFilter
    }
  `,
});
