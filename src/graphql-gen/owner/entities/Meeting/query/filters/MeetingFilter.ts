import { Input } from '../../../../common';
import gql from 'graphql-tag';

export default new Input({
  schema: gql`
    input MeetingFilter {
      or: [MeetingFilterItem]
      and: [MeetingFilterItem]
      date: WhereDate
      curator: WhereID
      group: WhereID
      id: WhereID
    }
  `,
});
