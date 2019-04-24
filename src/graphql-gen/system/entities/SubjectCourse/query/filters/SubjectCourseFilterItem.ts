import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input SubjectCourseFilterItem {
      createdBy: WhereID
      updateBy: WhereID
      createdAt: WhereDate
      updatedAt: WhereDate
      removed: WhereBoolean
      owner: WhereString
    }
  `,
});
