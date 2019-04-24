import { Type } from '../../../../common';
import gql from 'graphql-tag';

export default new Type({
  schema: gql`
    type deleteStudentPayload {
      deletedItemId: ID
      student: Student
    }
  `,
});
