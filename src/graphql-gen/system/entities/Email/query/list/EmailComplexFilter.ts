import { Input } from '../../../../common';
import gql from 'graphql-tag';
export default new Input({
  schema: gql`
    input EmailComplexFilter {
      or: [EmailComplexFilter]
      and: [EmailComplexFilter]
      createdBy: WhereID
      updateBy: WhereID
      createdAt: WhereDate
      updatedAt: WhereDate
      removed: WhereBoolean
      owner: WhereString
    }
  `,
});
