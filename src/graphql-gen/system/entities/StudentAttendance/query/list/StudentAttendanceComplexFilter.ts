import { Input } from '../../../../common';
import gql from 'graphql-tag';
export default new Input({
  schema: gql`
    input StudentAttendanceComplexFilter {
      or: [StudentAttendanceComplexFilter]
      and: [StudentAttendanceComplexFilter]
      createdBy: WhereID
      updateBy: WhereID
      createdAt: WhereDate
      updatedAt: WhereDate
      removed: WhereBoolean
      owner: WhereString
      superpuper: WhereString
    }
  `,
});
