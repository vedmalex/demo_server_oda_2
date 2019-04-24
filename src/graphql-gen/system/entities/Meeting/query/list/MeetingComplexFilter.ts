import { Input } from '../../../../common';
import gql from 'graphql-tag';
export default new Input({
  schema: gql`
    input MeetingComplexFilter {
      or: [MeetingComplexFilter]
      and: [MeetingComplexFilter]
      createdBy: WhereID
      updateBy: WhereID
      createdAt: WhereDate
      updatedAt: WhereDate
      removed: WhereBoolean
      owner: WhereString
    }
  `,
});
