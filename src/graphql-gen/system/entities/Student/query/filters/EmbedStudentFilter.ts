import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input EmbedStudentFilter {
      or: [EmbedStudentFilterItem]
      and: [EmbedStudentFilterItem]
      some: StudentFilter
      none: StudentFilter
      every: StudentFilter
    }
  `,
});
