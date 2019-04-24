import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input EmbedCourseFilter {
      or: [EmbedCourseFilterItem]
      and: [EmbedCourseFilterItem]
      some: CourseFilter
      none: CourseFilter
      every: CourseFilter
    }
  `,
});
