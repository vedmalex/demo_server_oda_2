import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input EmbedStudentAttendanceFilterItem {
      some: StudentAttendanceFilter
      none: StudentAttendanceFilter
      every: StudentAttendanceFilter
    }
  `,
});
