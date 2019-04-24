import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input EmbedStudentAttendanceFilter {
      or: [EmbedStudentAttendanceFilterItem]
      and: [EmbedStudentAttendanceFilterItem]
      some: StudentAttendanceFilter
      none: StudentAttendanceFilter
      every: StudentAttendanceFilter
    }
  `,
});
