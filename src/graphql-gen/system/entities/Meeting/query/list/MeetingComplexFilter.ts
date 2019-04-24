import { Input } from '../../../../common';
import gql from 'graphql-tag';
export default new Input({
  schema: gql`
    input MeetingComplexFilter {
      or: [MeetingComplexFilter]
      and: [MeetingComplexFilter]
      date: WhereDate
      curator: WhereID
      group: WhereID
      id: WhereID
    }
  `,
});
