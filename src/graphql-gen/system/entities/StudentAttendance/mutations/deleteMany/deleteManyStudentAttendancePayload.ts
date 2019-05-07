import { Type } from '../../../../common';
import gql from 'graphql-tag';

export default new Type({
  schema: gql`
    type deleteManyStudentAttendancePayload {
      deletedItemId: ID
      studentAttendance: StudentAttendance
    }
  `,
});
