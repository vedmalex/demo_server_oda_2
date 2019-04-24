import { Input } from '../../../../common';
import gql from 'graphql-tag';
export default new Input({
  schema: gql`
    input StudentAttendanceComplexFilter {
      or: [StudentAttendanceComplexFilter]
      and: [StudentAttendanceComplexFilter]
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
