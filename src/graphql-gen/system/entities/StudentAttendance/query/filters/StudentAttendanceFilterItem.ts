import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input StudentAttendanceFilterItem {
      meeting: WhereString
      student: WhereString
      meetingLink: WhereID
      studentLink: WhereID
      present: WhereBoolean
      specialNotes: WhereString
      id: WhereID
      superpuper: WhereString
    }
  `,
});
