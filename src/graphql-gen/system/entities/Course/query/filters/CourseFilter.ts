import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input CourseFilter {
      or: [CourseFilterItem]
      and: [CourseFilterItem]
      createdBy: WhereID
      updateBy: WhereID
      createdAt: WhereDate
      updatedAt: WhereDate
      removed: WhereBoolean
      owner: WhereString
    }
  `,
});
